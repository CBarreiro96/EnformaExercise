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
  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private personaService: PersonaService
  ) { }

  ngOnInit() {
    this.personaForm = this.formBuilder.group({
      usuario: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    });
  }

  registraPersona() {
    // Llamada al método de registro del servicio UsuarioService, pasando los valores actuales del formulario
    this.personaService.registro(
      this.personaForm.get('usuario')?.value,
      this.personaForm.get('password')?.value,
      )
      .subscribe(res => { // Se redirige al usuario a la página principal si el registro fue exitoso
        this.toastrService.success('Registro exitoso', 'Información', {
          closeButton: true,
        });
        this.router.navigate([`/`])
      },
        error => { // Se muestra un mensaje de error si el registro falló
          this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});
      })
    }

    get usuario() {
      return this.personaForm.get('usuario');
    }

    get password() {
      return this.personaForm.get('password');
    }
    get confirmpassword() {
      return this.personaForm.get('confirmPassword');
    }



}
