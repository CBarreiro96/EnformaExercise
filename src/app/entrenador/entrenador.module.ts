import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrenadorListaComponent } from './entrenador-lista/entrenador-lista.component';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';

@NgModule({
  imports: [CommonModule, EncabezadoAppModule],
  declarations: [EntrenadorListaComponent],
})
export class EntrenadorModule {}
