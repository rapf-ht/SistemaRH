import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Cadastro } from './components/cadastro/cadastro';
import { ListaFuncionarios } from './components/lista-funcionarios/lista-funcionarios';
import { FormularioFuncionarios } from './components/formulario-funcionarios/formulario-funcionarios';
import { Enderecos } from './components/enderecos/enderecos';
import { Contatos } from './components/contatos/contatos';

// Declara o array estático de objetos Route avaliado sequencialmente (first-match wins) pelo Router.
export const routes: Routes = [
  // Redireciona a raiz vazia ('') para '/login'.
  // pathMatch: 'full' exige igualdade exata da string de URL inteira antes de disparar o redirecionamento.
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Mapeia cada segmento de path (sem barra inicial) para a referência de classe do componente Standalone correspondente.
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'funcionarios', component: ListaFuncionarios },
  { path: 'funcionarios/novo', component: FormularioFuncionarios },
  { path: 'enderecos', component: Enderecos },
  { path: 'contatos', component: Contatos },

  // Rota curinga (wildcard): intercepta qualquer URI não resolvida nos índices anteriores do array.
  // Alocada obrigatoriamente na última posição para não bloquear as rotas válidas acima.
  { path: '**', redirectTo: 'login' }
];
