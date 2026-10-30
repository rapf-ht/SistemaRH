import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Componente Standalone da tela de autenticação (/login).
// Registra RouterLink no array imports para habilitar o redirecionamento declarativo para /cadastro no template.
@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {}
