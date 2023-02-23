import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { EntrenadorListaComponent } from './entrenador-lista/entrenador-lista.component';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';

@NgModule({
  imports: [CommonModule, NgbPaginationModule, EncabezadoAppModule],
  declarations: [EntrenadorListaComponent],
})
export class EntrenadorModule {}
