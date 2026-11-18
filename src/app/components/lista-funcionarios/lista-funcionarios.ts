import { Component, inject, OnInit, signal } from '@angular/core';
import { Colaborador } from '../../models/colaborador';
import { ColaboradoresService } from '../../services/colaboradores';
@Component({
  selector: 'app-lista-funcionarios',
  templateUrl: './lista-funcionarios.html',
  styleUrl: './lista-funcionarios.css',
})
export class ListaFuncionarios implements OnInit {
  private readonly colaboradoresService = inject(ColaboradoresService);
  protected readonly colaboradores = signal<Colaborador[]>([]);
  protected readonly carregando = signal(true);
  protected readonly erro = signal('');
  ngOnInit(): void {
    this.colaboradoresService.listar().subscribe({
      next: (lista) => {
        this.colaboradores.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os colaboradores.');
        this.carregando.set(false);
      },
    });
  }
}
