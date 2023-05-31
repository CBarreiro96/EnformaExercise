import { Component, OnInit } from '@angular/core';
import { Entrenador } from '../entrenador';
import { EntrenadorService } from '../entrenador.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entrenador-lista',
  templateUrl: './entrenador-lista.component.html',
  styleUrls: ['./entrenador-lista.component.css'],
})
export class EntrenadorListaComponent implements OnInit {
  entrenadores: Array<Entrenador> = [];
  page = 1;
  pageSize = 15;
  esEntrenador = true;

  constructor(
    private entrenadorService: EntrenadorService,
    private toastr: ToastrService,
    ) {}

  entrenadorEliminar(idEntrenador: number): void {
    this.entrenadorService.eliminarentrenador(idEntrenador).subscribe((entrenador) => {
        this.toastr.success("Confirmation", "Entrenador eliminado de la lista")
        this.ngOnInit();
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
      });
  }

  ngOnInit() {
    this.entrenadorService.darEntrenadores().subscribe((entrenadores) => {
      this.entrenadores = entrenadores;
    });
  }
}
