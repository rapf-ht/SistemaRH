import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Inicializa a instância raiz da aplicação no DOM injetando os providers de appConfig.
// Captura falhas críticas de bootstrap e registra a stack trace no stderr do navegador.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
