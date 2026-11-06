import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Cadastro } from './components/cadastro/cadastro';
import { ListaFuncionarios } from './components/lista-funcionarios/lista-funcionarios';
import { FormularioFuncionarios } from './components/formulario-funcionarios/formulariofuncionarios';
import { Enderecos } from './components/enderecos/enderecos';
import { Contatos } from './components/contatos/contatos';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
  { path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
// Rotas públicas
  { 
    path: 'login', 
    component: Login },
  { 
    path: 'cadastro', 
    component: Cadastro },
// Rotas protegidas
  {
  path: '',
  canActivateChild: [authGuard],
  children: [
    { 
      path: 'lista-funcionarios', 
      component: ListaFuncionarios 
    },
    { 
      path: 'formulario-funcionarios', 
      component: FormularioFuncionarios 
    },
    { 
      path: 'enderecos', 
      component: Enderecos 
    },
    { 
      path: 'contatos', 
      component: Contatos 
    },
   ],
  },

  { 
    path: '**', 
    redirectTo: 'login' 
  },
];

