import { Component, Input, OnInit } from '@angular/core';
import { Rutina } from '../rutina';

@Component({
  selector: 'app-rutina-detalle',
  templateUrl: './rutina-detalle.component.html',
  styleUrls: ['./rutina-detalle.component.css']
})
export class RutinaDetalleComponent implements OnInit {

  @Input() rutinaDetalle: Rutina;

  constructor() { }

  ngOnInit() {
  }

}
