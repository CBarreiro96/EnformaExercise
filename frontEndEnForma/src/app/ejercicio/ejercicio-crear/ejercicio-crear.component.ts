import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from './../ejercicio';
import { EjercicioService } from './../ejercicio.service';

@Component({
  selector: 'app-ejercicio-crear',
  templateUrl: './ejercicio-crear.component.html',
  styleUrls: ['./ejercicio-crear.component.css']
})
export class EjercicioCrearComponent implements OnInit {

  ejercicioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private ejercicioService: EjercicioService
  ) { }

  ngOnInit() {
    this.ejercicioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      descripcion: ["", [Validators.required, Validators.maxLength(100)]],
      video: ["", [Validators.required, Validators.minLength(2)]],
      calorias: ["", Validators.required]
    });
  }

  crearEjercicio(ejercicio: Ejercicio): void {
    this.ejercicioService.crearEjercicio(ejercicio).subscribe((ejercicio) => {
      this.toastr.success("Confirmation", "Ejercicio creado")
      this.ejercicioForm.reset();
      this.routerPath.navigate(['/ejercicio']);
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

  cancelarEjercicio(): void {
    this.ejercicioForm.reset();
    this.routerPath.navigate(['/ejercicio']);
  }

}
