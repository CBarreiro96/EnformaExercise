import { PersonaTerminarComponent } from './persona-terminar/persona-terminar.component';
import { PersonaReporteComponent } from './persona-reporte/persona-reporte.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { PersonaDetalleComponent } from './persona-detalle/persona-detalle.component';
import { PersonaListaComponent } from './persona-lista/persona-lista.component';
import { PersonaEditarComponent } from './persona-editar/persona-editar.component';
import { PersonaCrearComponent } from './persona-crear/persona-crear.component';
import { EntrenamientoPersonaListaComponent } from '../entrenamiento/entrenamiento-persona-lista/entrenamiento-persona-lista.component';
import {PersonaRegistroComponent} from "./persona-registro/persona-registro.component";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    EncabezadoAppModule,
    NgbTooltip
  ],
  exports: [
    PersonaListaComponent,
    PersonaDetalleComponent,
    PersonaCrearComponent,
    PersonaEditarComponent,
    EntrenamientoPersonaListaComponent,
    PersonaTerminarComponent,
    PersonaRegistroComponent
  ],
  declarations: [
    PersonaListaComponent,
    PersonaDetalleComponent,
    PersonaCrearComponent,
    PersonaEditarComponent,
    PersonaReporteComponent,
    EntrenamientoPersonaListaComponent,
    PersonaTerminarComponent,
    PersonaRegistroComponent
  ]
})
export class PersonaModule { }
