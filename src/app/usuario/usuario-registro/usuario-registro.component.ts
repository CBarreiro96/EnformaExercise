import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {

  // Declaración de la variable usuarioForm de tipo FormGroup, que representa el formulario de registro
  usuarioForm!: FormGroup;

  constructor(
    // Inyección de servicios necesarios para el registro de usuario
    private usuarioService: UsuarioService, // servicio para interactuar con el backend
    private formBuilder: FormBuilder, // servicio para construir el formulario
    private router: Router, // servicio para redirigir a otra página después del registro
    private toastrService: ToastrService // servicio para mostrar mensajes al usuario
  )
  {}

  ngOnInit() {
    // Construcción del formulario mediante el FormBuilder, definiendo los campos del formulario y sus validadores
    this.usuarioForm = this.formBuilder.group({
      usuario: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      nombre: ["", [Validators.required, Validators.maxLength(60), Validators.minLength(3)]],
      apellido: ["", [Validators.required, Validators.maxLength(60), Validators.minLength(3)]]
    });
  }

  // Función que se llama cuando se hace clic en el botón de registro
  registrarUsuario() {
    // Llamada al método de registro del servicio UsuarioService, pasando los valores actuales del formulario
    this.usuarioService.registro(
      this.usuarioForm.get('usuario')?.value, 
      this.usuarioForm.get('password')?.value,
      this.usuarioForm.get('nombre')?.value,
      this.usuarioForm.get('apellido')?.value
      )
      .subscribe(res => { // Se redirige al usuario a la página principal si el registro fue exitoso
        this.router.navigate([`/`])
      },
        error => { // Se muestra un mensaje de error si el registro falló
          this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});
      })
    }

    get usuario() {
      return this.usuarioForm.get('usuario');
    }

    get password() {
      return this.usuarioForm.get('password');
    }
    get confirmpassword() {
      return this.usuarioForm.get('confirmPassword');
    }
    get nombre() {
      return this.usuarioForm.get('nombre');
    }
    get apellido() {
      return this.usuarioForm.get('apellido');
    }
}
