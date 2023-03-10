import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from '../persona.service';
import {Persona} from "../persona";

@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css']
})
export class PersonaRegistroComponent implements OnInit {

  persona: Persona
  personaForm!: FormGroup;
  personId!: number;

  // Se inyectan los servicios necesarios en el constructor del componente
  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private router: ActivatedRoute,
    private personaService: PersonaService,
  ) { }

  ngOnInit() {
    const personaId = parseInt(this.router.snapshot.paramMap.get('id')!);
      // Se define el formulario y sus campos con las validaciones correspondientes
    this.personaForm = this.formBuilder.group({
      id: personaId,
      usuario: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    });
  }

  registrarPersona(persona: Persona): void{
    this.personaService.registroPersona(this.personaForm.get('usuario')?.value,
      this.personaForm.get('password')?.value,persona).subscribe((persona) => {
        console.log(persona.id);
        this.toastrService.success("Confirmation", "Persona creada")
        this.personaForm.reset();
        this.routerPath.navigate(['/persona/']);
      },
        error => { // Si el registro falló, se muestra un mensaje de error
          if(error.status === 409) {
            this.toastrService.error("El cliente ya posee un usuario", "Error", {closeButton: true});
          }
          else {
            this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});

          }
        })
  }

  // Se definen getters para obtener los campos del formulario
  get usuario() {
    return this.personaForm.get('usuario');
  }

  get password() {
    return this.personaForm.get('password');
  }
  get confirmpassword() {
    return this.personaForm.get('confirmPassword');
  }
  cancelarPersonaRegistro(): void {
    // Se reinicia el formulario y se redirige a la página de registro de personas
    this.personaForm.reset();
    this.routerPath.navigate(['/persona']);
  }



}
