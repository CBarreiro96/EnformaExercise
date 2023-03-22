import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { RutinaCrearComponent } from './rutina-crear/rutina-crear.component';
import { RutinaListaComponent } from './rutina-lista/rutina-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { RutinaDetalleComponent } from './rutina-detalle/rutina-detalle.component';
import { EjercicioRutinaListaComponent } from '../ejercicio/ejercicio-rutina-lista/ejercicio-rutina-lista.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [
    RutinaCrearComponent,
    RutinaListaComponent,
    RutinaDetalleComponent,
    EjercicioRutinaListaComponent,
  ],
  declarations: [
    RutinaCrearComponent,
    RutinaListaComponent,
    RutinaDetalleComponent,
    EjercicioRutinaListaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    EncabezadoAppModule,
    NgbPaginationModule,
  ],
})
export class RutinaModule {}
