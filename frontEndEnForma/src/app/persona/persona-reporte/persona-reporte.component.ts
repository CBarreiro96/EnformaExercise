import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona-reporte',
  templateUrl: './persona-reporte.component.html',
  styleUrls: ['./persona-reporte.component.css']
})
export class PersonaReporteComponent implements OnInit {

  persona: Persona
  imc: number
  clasificacion: string
  resultados: any

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private personaService: PersonaService
  ) { }

  ngOnInit() {
    const idPersona = parseInt(this.router.snapshot.params['id']);
    this.personaService.darReporte(idPersona).subscribe((reporte) => {
      console.log(reporte)
      this.persona = reporte.persona
      this.imc = reporte.imc
      this.clasificacion = reporte.clasificacion_imc
      this.resultados = reporte.resultados
    });
  }

  volver(): void {
    const idPersona = parseInt(this.router.snapshot.params['id']);
    this.routerPath.navigate(['/persona/' + idPersona]);
  }


}
