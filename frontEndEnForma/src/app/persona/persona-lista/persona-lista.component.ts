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

  esCliente = true;

  training = false

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
    this.personaService.eliminarPersona(idPersona).subscribe(
      (persona) => {
        this.toastr.success("Confirmation", "Persona eliminada de la lista");
        this.ngOnInit();
      },
      (error) => {
        if (error.statusText === "UNAUTHORIZED") {
          this.toastr.error("Error", "Su sesión ha caducado, por favor vuelva a iniciar sesión.");
        } else if (error.statusText === "UNPROCESSABLE ENTITY") {
          this.toastr.error("Error", "No hemos podido identificarlo, por favor vuelva a iniciar sesión.");
        } else {
          this.toastr.error("Error", "Ha ocurrido un error. " + error.message);
        }
      }
    );
  }

  personaReporte(idPersona: number): void {
    console.log("si")
    this.routerPath.navigate(['/persona/reporte/' + idPersona]);
  }

  personaTerminar(idPersona: number): void {
    this.routerPath.navigate(['/persona/terminar/' + idPersona]);
  }

  personaRegistrar(idPersona: number): void {
    this.routerPath.navigate(['/persona/registrar/'+ idPersona]);
  }

  ngOnInit() {
    // Get the user role from sessionStorage
    this.esCliente = sessionStorage.getItem('rolUsuario') == 'Cliente';
    console.log(this.esCliente)

    // If the user is not a client, get all the personas
    if (!this.esCliente) {
      this.personaService.darPersonas().subscribe((personas) => {
        // Set the personas array to the results of the request
        this.personas = personas;

        // Get the persona ID from the router params
        const personaId = parseInt(this.router.snapshot.params['id']);


        // If the persona ID is not null,
        if (!(personaId == null)) {
          // Log that there are personas
          console.log('si hay personas');
          // Loop through the personas array
          for (let i = 0; i < this.personas.length; i++) {
            console.log(this.personas[i])
            // If the current persona's ID matches the persona ID from the router params,
            if (this.personas[i].id == personaId) {
              // Log that we entered the if statement
              console.log('entre al if');

              // Get the entrenamientos for the persona
              this.entrenamientoService.darEntrenamientos(personaId).subscribe((entrenamientos) => {
                // Set the elegida flag to true
                this.elegida = true;

                // Set the personaElegida property to the current persona
                this.personaElegida = this.personas[i];

                // Set the entrenamientos property to the results of the request
                this.entrenamientos = entrenamientos;
              });
            }
          }
        }
      });
    } else {
      // If the user is a client, get the persona for the current user
      this.personaService.darPersonaUsuario().subscribe((personas) => {

        // Push the persona to the personas array
        this.personas.push(personas);

        // Get the persona ID from the router params
        const personaId = parseInt(this.router.snapshot.params['id']);
      });
    }
  }
}
