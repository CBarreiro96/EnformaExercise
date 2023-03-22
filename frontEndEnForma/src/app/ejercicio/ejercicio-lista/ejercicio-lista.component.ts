import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from './../ejercicio';
import { EjercicioService } from '../ejercicio.service';

@Component({
  selector: 'app-ejercicio-lista',
  templateUrl: './ejercicio-lista.component.html',
  styleUrls: ['./ejercicio-lista.component.css']
})
export class EjercicioListaComponent implements OnInit {

  ejercicios: Array<Ejercicio>=[]
  constructor(
    private routerPath: Router,
    private toastr: ToastrService,
    private ejercicioService: EjercicioService
  ) { }

  ejercicioCrear(): void {
    this.routerPath.navigate(['/ejercicio/crear/']);
  }

  ejercicioEditar(ejercicioId: number): void {
    this.routerPath.navigate(['/ejercicio/editar/' + ejercicioId]);
  }

  ejercicioEliminar(ejercicioId: number): void {
    this.ejercicioService.eliminarEjercicio(ejercicioId).subscribe((ejercicio) => {
      this.toastr.success("Confirmation", "Ejercicio eliminado")
      window.location.reload();
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

  ngOnInit() {
    this.ejercicioService.darEjercicios().subscribe((ejercicios) => {
      this.ejercicios = ejercicios;
    })
  }

}
