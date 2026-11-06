import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { LoginRequest } from '../models/login-request';

const CHAVE_TOKEN = 'sistemarh_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  // Token em memória: o que p guard consulta
  private readonly _token = signal<string | null>(this.recuperarToken());
  readonly token = this._token.asReadonly();
  readonly estaLogado = computed(() => !!this._token());

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, dados)
      .pipe(tap((resposta) => this.salvarToken(resposta.token)));
  }

  logout(): void {
    this._token.set(null);
    localStorage.removeItem(CHAVE_TOKEN);
    sessionStorage.removeItem(CHAVE_TOKEN);
    document.cookie = `${CHAVE_TOKEN}=; path=/; max-age=0;`;
    this.router.navigate(['/login']);
  }

  private salvarToken(token: string): void {
    this._token.set(token);
    this.salvarNoSessionStorage(token);
    this.salvarNoLocalStorage(token);
    this.salvarNoCookie(token);
  }

  // sessionStorage: expira ao fechar o navegador
  private salvarNoSessionStorage(token: string): void {
    sessionStorage.setItem(CHAVE_TOKEN, token);
  }

  // localStorage: persiste mesmo após fechar o navegador
  private salvarNoLocalStorage(token: string): void {
    localStorage.setItem(CHAVE_TOKEN, token);
  }

  // Cookie: expira em 1 hora
  private salvarNoCookie(token: string): void {
    const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString(); // 1 hora
    document.cookie = `${CHAVE_TOKEN}=${token}; path=/; expires=${expires};`;
  }

  private recuperarToken(): string | null {
    // Prioridade: sessionStorage > localStorage > cookie
    return (
      sessionStorage.getItem(CHAVE_TOKEN) ??
      localStorage.getItem(CHAVE_TOKEN) ??
      this.lerCookie(CHAVE_TOKEN)
    );
  }

  private lerCookie(nome: string): string | null {
    const item = document.cookie.split(';').find((c) => c.startsWith(`${nome}=`));
    return item ? decodeURIComponent(item.substring(nome.length + 1)) : null;
  }
}
