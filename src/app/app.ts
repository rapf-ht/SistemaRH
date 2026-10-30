import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// Componente raiz (shell da aplicação).
// Importa as diretivas RouterLink (binding de navegação SPA), RouterLinkActive (mutação de classe CSS por rota ativa)
// e RouterOutlet (container de projeção dinâmica de componentes no DOM).
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Armazena o identificador da aplicação em propriedade de instância.
  protected readonly title = 'SistemaRH';
}
