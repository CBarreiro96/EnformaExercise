import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css'],
})
export class EncabezadoComponent implements OnInit {
  userRole: string = '';
  constructor() {}

  ngOnInit() {
    this.userRole = sessionStorage.getItem('userRole');
  }
}
