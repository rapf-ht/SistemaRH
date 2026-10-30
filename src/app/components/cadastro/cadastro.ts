import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Componente Standalone para criação de conta de usuário (/cadastro).
// Inclui RouterLink para permitir retorno direto à rota /login sem disparo de requisição de rede.
@Component({
  selector: 'app-cadastro',
  imports: [RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {}
