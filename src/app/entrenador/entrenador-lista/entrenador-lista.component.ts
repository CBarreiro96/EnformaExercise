import { Component, OnInit } from '@angular/core';
import { Entrenador } from '../entrenador';

@Component({
  selector: 'app-entrenador-lista',
  templateUrl: './entrenador-lista.component.html',
  styleUrls: ['./entrenador-lista.component.css'],
})
export class EntrenadorListaComponent implements OnInit {
  entrenadores: Array<Entrenador> = [];

  constructor() {}

  ngOnInit() {}
}
