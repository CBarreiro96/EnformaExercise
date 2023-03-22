import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from './../ejercicio';
import { EjercicioService } from '../ejercicio.service';

@Component({
  selector: 'app-ejercicio-editar',
  templateUrl: './ejercicio-editar.component.html',
  styleUrls: ['./ejercicio-editar.component.css']
})
export class EjercicioEditarComponent implements OnInit {

  ejercicio: Ejercicio;
  ejercicioForm: FormGroup;

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private ejercicioService: EjercicioService
  ) { }

  ngOnInit() {
    const id = parseInt(this.router.snapshot.params['id']);
    this.ejercicioService.darEjercicio(id).subscribe((ejercicio) => {
      this.ejercicio = ejercicio
      this.ejercicioForm = this.formBuilder.group({
      id: [this.ejercicio.id, []],
      nombre: [this.ejercicio.nombre, [Validators.required, Validators.minLength(2)]],
      descripcion: [this.ejercicio.descripcion, [Validators.required, Validators.maxLength(100)]],
      video: [this.ejercicio.video, [Validators.required, Validators.minLength(2)]],
      calorias: [Number(this.ejercicio.calorias).toFixed(2), [Validators.required]]
      });
    });

  }

  editarEjercicio(ejercicio: Ejercicio): void {
    this.ejercicioService.editarEjercicio(ejercicio).subscribe((ejercicio) => {
      this.toastr.success("Confirmation", "Ejercicio editado")
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
