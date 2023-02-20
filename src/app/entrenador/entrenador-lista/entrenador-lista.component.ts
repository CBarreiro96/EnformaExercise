import { Component, OnInit } from '@angular/core';
import { Entrenador } from '../entrenador';
import { EntrenadorService } from '../entrenador.service';

@Component({
  selector: 'app-entrenador-lista',
  templateUrl: './entrenador-lista.component.html',
  styleUrls: ['./entrenador-lista.component.css'],
})
export class EntrenadorListaComponent implements OnInit {
  entrenadores: Array<Entrenador> = [
    new Entrenador(1, 'Benito', '', '', '', [], []),
    new Entrenador(2, 'David', '', '', '', [], []),
    new Entrenador(3, 'Isai', '', '', '', [], []),
    new Entrenador(4, 'Camilo', '', '', '', [], []),
    new Entrenador(5, 'Juan', '', '', '', [], []),
    new Entrenador(6, 'Dario', '', '', '', [], []),
    new Entrenador(7, 'Carmen', '', '', '', [], []),
    new Entrenador(8, 'Adriana', '', '', '', [], []),
  ];
  page = 1;
  pageSize = 4;
  collectionSize = this.entrenadores.length;

  constructor(private entrenadorService: EntrenadorService) {}

  ngOnInit() {
    this.entrenadorService.darEntrenadores().subscribe((entrenadores) => {
      this.entrenadores = entrenadores
        .map((entrenador, i) => ({ id: i + 1, ...entrenador }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
    });
  }
}
