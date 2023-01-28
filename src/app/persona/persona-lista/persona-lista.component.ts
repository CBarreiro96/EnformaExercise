import { EntrenamientoService } from './../../entrenamiento/entrenamiento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Entrenamiento } from 'src/app/entrenamiento/entrenamiento';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona-lista',
  templateUrl: './persona-lista.component.html',
  styleUrls: ['./persona-lista.component.css']
})
export class PersonaListaComponent implements OnInit {


  personas:Array<Persona> = []
  elegida: Boolean = false
  personaElegida: Persona
  entrenamientos: Array<Entrenamiento> = []

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private personaService: PersonaService,
    private entrenamientoService: EntrenamientoService
  ) { }

  darPersonas(): void {
  }

  elegir(persona: Persona): void {
    this.entrenamientoService.darEntrenamientos(persona.id).subscribe((entrenamientos) => {
      this.elegida = true;
      this.personaElegida = persona;
      this.entrenamientos = entrenamientos;
    });
  }

  personaCrear(): void {
    this.routerPath.navigate(['/persona/crear/']);
  }

  personaEditar(idPersona: number): void {
    this.routerPath.navigate(['/persona/editar/' + idPersona]);
  }

  personaEliminar(idPersona: number): void {
    this.personaService.eliminarPersona(idPersona).subscribe((persona) => {
      this.toastr.success("Confirmation", "Persona eliminada de la lista")
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

  personaReporte(idPersona: number): void {
    console.log("si")
    this.routerPath.navigate(['/persona/reporte/' + idPersona]);
  }

  personaTerminar(idPersona: number): void {
    this.routerPath.navigate(['/persona/terminar/' + idPersona]);
  }

  ngOnInit() {
    this.personaService.darPersonas().subscribe((personas) => {
      this.personas = personas;
      const personaId = parseInt(this.router.snapshot.params['id']);
      if(!(personaId==null)) {
        for(let i=0;i<this.personas.length;i++) {
          if(this.personas[i].id==personaId) {
            this.entrenamientoService.darEntrenamientos(personaId).subscribe((entrenamientos) => {
              this.elegida = true;
              this.personaElegida = this.personas[i];
              this.entrenamientos = entrenamientos;
            });
            //i=this.personas.length;
          }
        }
      }
    })
  }
}
