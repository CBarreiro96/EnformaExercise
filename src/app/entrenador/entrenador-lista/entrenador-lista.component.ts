import { Component, OnInit } from '@angular/core';
import { Entrenador } from '../entrenador';
import { EntrenadorService } from '../entrenador.service';

@Component({
  selector: 'app-entrenador-lista',
  templateUrl: './entrenador-lista.component.html',
  styleUrls: ['./entrenador-lista.component.css'],
})
export class EntrenadorListaComponent implements OnInit {
  entrenadores: Array<Entrenador> = [];

  constructor(private entrenadorService: EntrenadorService) {}

  ngOnInit() {
    this.entrenadorService.darEntrenadores().subscribe((entrenadores) => {
      this.entrenadores = entrenadores;
    });
  }
}
