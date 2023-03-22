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

@Component({
  selector: 'app-entrenamiento-crear',
  templateUrl: './entrenamiento-crear.component.html',
  styleUrls: ['./entrenamiento-crear.component.css']
})
export class EntrenamientoCrearComponent implements OnInit {

  persona: Persona;
  entrenamiento: Entrenamiento;
  entrenamientoForm: FormGroup;
  ejercicios: Array<Ejercicio>

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
    const personaId = parseInt(this.router.snapshot.params['idPersona']);
    this.personaService.darPersona(personaId).subscribe((persona) => {
      this.persona = persona
      this.ejercicioService.darEjercicios().subscribe((ejercicios) => {
        this.ejercicios = ejercicios
        this.entrenamientoForm = this.formBuilder.group({
          idPersona: this.persona.id,
          ejercicio: ["", Validators.required],
          fecha: [new Date(), [Validators.required, Validators.minLength(10)]],
          tiempo: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
          repeticiones: ["", Validators.required]
        });

      });

    });

  }

   crearEntrenamiento(entrenamiento: Entrenamiento): void {
    this.entrenamientoService.crearEntrenamiento(entrenamiento, this.persona.id).subscribe((entrenamiento) => {
      this.toastr.success("Confirmation", "Entrenamiento creado")
      this.entrenamientoForm.reset();
      this.routerPath.navigate(['/persona/' + this.persona.id]);
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
    const personaId = parseInt(this.router.snapshot.params['idPersona']);
    this.entrenamientoForm.reset();
    this.routerPath.navigate(['/persona/' + personaId]);
  }

}
