import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rutina } from '../rutina';
import { RutinaService } from '../rutina.service';

@Component({
  selector: 'app-rutina-crear',
  templateUrl: './rutina-crear.component.html',
  styleUrls: ['./rutina-crear.component.css']
})
export class RutinaCrearComponent implements OnInit {

  rutinaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private rutinaService: RutinaService
  ) { }

  ngOnInit() {
    this.rutinaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(50),Validators.minLength(3)]],
      descripcion: ["", [Validators.required, Validators.maxLength(100),Validators.minLength(10)]],
    });
  }

  // Este método se encarga de llamar al servicio de creación de rutina con los datos del formulario y maneja la respuesta
  // mostrando un mensaje de éxito en caso de éxito y mensajes de error específicos en caso de errores conocidos o genéricos
  crearRutina(rutina: Rutina): void {
    this.rutinaService.crearRutina(rutina).subscribe((rutina) => {
    this.toastr.success("Confirmation", "Rutina creada")
    this.rutinaForm.reset();
    this.routerPath.navigate(['/rutina']);
  },
  error => {
    // Si el error es por falta de autorización, muestra un mensaje específico de sesión caducada
    if (error.statusText === "UNAUTHORIZED") {
      this.toastr.error("Error", "Su sesión ha caducado, por favor vuelva a iniciar sesión.")
    }
    // Si el error es por entidad no procesable, muestra un mensaje específico de identificación fallida
    else if (error.statusText === "UNPROCESSABLE ENTITY") {
      this.toastr.error("Error", "No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    // Si el error es genérico, muestra un mensaje genérico de error y agrega el mensaje de error original como detalle
    else {
      this.toastr.error("Error", "Ha ocurrido un error. " + error.message)
    }
  })
  }
  
  // Este método se encarga de resetear el formulario y navegar de vuelta a la página de listado de rutinas
  cancelarRutina(): void {
    this.rutinaForm.reset();
    this.routerPath.navigate(['/rutina']);
  }
  
  // Estos son dos getters que facilitan el acceso a los campos "nombre" y "descripcion" del formulario desde el HTML de la vista
  get nombre() {
    return this.rutinaForm.get('nombre');
  }
  
  get descripcion() {
    return this.rutinaForm.get('descripcion');
  }

}
