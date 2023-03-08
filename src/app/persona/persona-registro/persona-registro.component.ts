import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css']
})
export class PersonaRegistroComponent implements OnInit {

  personaForm!: FormGroup;

  // Se inyectan los servicios necesarios en el constructor del componente
  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private router: Router,
    private personaService: PersonaService
  ) { }

  ngOnInit() {
    // Se define el formulario y sus campos con las validaciones correspondientes
    this.personaForm = this.formBuilder.group({
      usuario: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    });
  }

  registrarPersona() {
    //Se llama al método de registro del servicio personaService, pasando los valores actuales del formulario
    this.personaService.registroPersona(
      this.personaForm.get('usuario')?.value,
      this.personaForm.get('password')?.value,
      )
      .subscribe(res => { // Si el registro fue exitoso, se muestra un mensaje y se redirige a la lista de personas
        this.toastrService.success('Registro exitoso', 'Información', {
          closeButton: true,
        });
        this.router.navigate([`/persona`])
      },
        error => { // Si el registro falló, se muestra un mensaje de error
          this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});
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
