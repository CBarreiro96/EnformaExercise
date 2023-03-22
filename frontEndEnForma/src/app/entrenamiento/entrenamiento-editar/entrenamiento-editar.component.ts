import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../../persona/persona';
import { PersonaService } from 'src/app/persona/persona.service';
import { Ejercicio } from 'src/app/ejercicio/ejercicio';
import { EjercicioService } from './../../ejercicio/ejercicio.service';
import { Entrenamiento } from './../entrenamiento';
import { EntrenamientoService } from '../entrenamiento.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-entrenamiento-editar',
  templateUrl: './entrenamiento-editar.component.html',
  styleUrls: ['./entrenamiento-editar.component.css']
})
export class EntrenamientoEditarComponent implements OnInit {

  persona: Persona;
  entrenamiento: Entrenamiento;
  entrenamientoForm: FormGroup;
  ejercicios: Array<Ejercicio>;
  idEjercicio: number;

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private personaService: PersonaService,
    private ejercicioService: EjercicioService,
    private entrenamientoService: EntrenamientoService
) { }

  ngOnInit() {
    const entrenamientoId = parseInt(this.router.snapshot.params['id']);
    this.entrenamientoService.darEntrenamiento(entrenamientoId).subscribe((entrenamiento) => {
      this.entrenamiento = entrenamiento;
      this.ejercicioService.darEjercicios().subscribe((ejercicios) => {
        this.ejercicios = ejercicios;
        this.idEjercicio = Number(entrenamiento.ejercicio);
        this.entrenamientoForm = this.formBuilder.group({
          id: [this.entrenamiento.id, []],
          persona: [this.entrenamiento.persona, []],
          ejercicio: [this.entrenamiento.ejercicio, Validators.required],
          fecha: [formatDate(this.entrenamiento.fecha, 'yyyy-MM-dd', 'en'), [Validators.required, Validators.minLength(10)]],
          tiempo: [this.entrenamiento.tiempo, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
          repeticiones: [Number(this.entrenamiento.repeticiones).toFixed(2), Validators.required]
        });
      });
    });
  }

  editarEntrenamiento(entrenamiento: any): void {
    this.entrenamientoService.editarEntrenamiento(entrenamiento).subscribe((entrenamiento) => {
      this.toastr.success("Confirmation", "Entrenamiento editado")
      this.entrenamientoForm.reset();
      this.routerPath.navigate(['/persona/' + this.entrenamiento.persona]);
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    })

  }

  cancelarEntrenamiento(): void {
    this.entrenamientoForm.reset();
    this.routerPath.navigate(['/persona/' + this.entrenamiento.persona]);
  }

}
