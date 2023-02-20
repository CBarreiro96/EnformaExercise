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
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      descripcion: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  crearRutina(rutina: Rutina): void {
    this.rutinaService.crearRutina(rutina).subscribe((rutina) => {
      this.toastr.success("Confirmation", "Rutina creada")
      this.rutinaForm.reset();
      this.routerPath.navigate(['/rutina']);
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

  cancelarRutina(): void {
    this.rutinaForm.reset();
    this.routerPath.navigate(['/rutina']);
  }

}
