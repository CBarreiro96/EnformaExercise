import { EntrenamientoEditarComponent } from './entrenamiento-editar/entrenamiento-editar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { EntrenamientoCrearComponent } from './entrenamiento-crear/entrenamiento-crear.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule
  ],
  exports: [
    EntrenamientoCrearComponent,
    EntrenamientoEditarComponent
  ],
  declarations: [
    EntrenamientoCrearComponent,
    EntrenamientoEditarComponent
  ]
})
export class EntrenamientoModule { }
