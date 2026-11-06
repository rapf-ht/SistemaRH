import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
// Define o container de injeção de dependência (DI) no nível de bootstrap da aplicação.
// provideZonelessChangeDetection remove o monkey-patching do Zone.js; re-renderizações ocorrem via Signals e eventos de template.
// provideRouter registra a matriz de rotas no serviço Router para resolução de URLs em memória.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
};
