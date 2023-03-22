import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona-editar',
  templateUrl: './persona-editar.component.html',
  styleUrls: ['./persona-editar.component.css']
})
export class PersonaEditarComponent implements OnInit {

  persona: Persona
  personaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
    private personaService: PersonaService
  ) { }

  ngOnInit() {
    const personaId = parseInt(this.router.snapshot.params['id']);
    this.personaService.darPersona(personaId).subscribe((persona) => {
      this.persona = persona;
      this.personaForm = this.formBuilder.group({
        id: [this.persona.id, []],
        nombre: [this.persona.nombre, [Validators.required, Validators.minLength(2)]],
        apellido: [this.persona.apellido, [Validators.required, Validators.minLength(2)]],
        talla: [Number(this.persona.talla).toFixed(2), Validators.required],
        peso: [Number(this.persona.peso).toFixed(2), Validators.required],
        edad: [Number(this.persona.edad).toFixed(0), Validators.required],
        ingreso: [formatDate(this.persona.ingreso, 'yyyy-MM-dd', 'en'), [Validators.required, Validators.minLength(10)]],
        brazo: [Number(this.persona.brazo).toFixed(2), Validators.required],
        pecho: [Number(this.persona.pecho).toFixed(2), Validators.required],
        cintura: [Number(this.persona.cintura).toFixed(2), Validators.required],
        pierna: [Number(this.persona.pierna).toFixed(2), Validators.required],
        entrenando: true,
        razon: "",
        terminado: "1900-01-01"
      });
    });

  }

  editarPersona(persona: Persona): void {
    this.personaService.editarPersona(persona).subscribe((persona) => {
      this.toastr.success("Confirmation", "Persona editada")
      this.personaForm.reset();
      this.routerPath.navigate(['/persona/' + persona.id]);
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

  cancelarPersona(): void {
    this.personaForm.reset();
    this.routerPath.navigate(['/persona/' + this.persona.id]);
  }
}
