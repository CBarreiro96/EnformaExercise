import { Component, Input, OnInit } from '@angular/core';
import { Persona } from '../persona';

@Component({
  selector: 'app-persona-detalle',
  templateUrl: './persona-detalle.component.html',
  styleUrls: ['./persona-detalle.component.css']
})
export class PersonaDetalleComponent implements OnInit {

  @Input() personaDetalle: Persona;

  constructor() { }

  ngOnInit() {
  }

}
