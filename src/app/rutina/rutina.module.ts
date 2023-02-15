import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { RutinaCrearComponent } from './rutina-crear/rutina-crear.component';
import { RutinaListaComponent } from './rutina-lista/rutina-lista.component';



@NgModule({
  exports: [
    RutinaCrearComponent,
    RutinaListaComponent
  ],
  declarations: [
    RutinaCrearComponent,
    RutinaListaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    EncabezadoAppModule
  ]
})
export class RutinaModule { }
