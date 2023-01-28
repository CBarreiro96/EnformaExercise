import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { EjercicioCrearComponent } from './ejercicio-crear/ejercicio-crear.component';
import { EjercicioEditarComponent } from './ejercicio-editar/ejercicio-editar.component';
import { EjercicioListaComponent } from './ejercicio-lista/ejercicio-lista.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    EncabezadoAppModule
  ],
  exports: [
    EjercicioListaComponent,
    EjercicioCrearComponent,
    EjercicioEditarComponent,
    RouterModule],
  declarations: [
    EjercicioListaComponent,
    EjercicioCrearComponent,
    EjercicioEditarComponent]
})
export class EjercicioModule { }
