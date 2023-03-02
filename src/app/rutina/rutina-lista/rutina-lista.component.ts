import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rutina } from '../rutina';
import { RutinaService } from '../rutina.service';
import { Ejercicio } from 'src/app/ejercicio/ejercicio';
import { EjercicioService } from './../../ejercicio/ejercicio.service';


@Component({
  selector: 'app-rutina-lista',
  templateUrl: './rutina-lista.component.html',
  styleUrls: ['./rutina-lista.component.css']
})
export class RutinaListaComponent implements OnInit {

  rutinas:Array<Rutina> = []
  elegida: Boolean = false
  rutinaElegida: Rutina
  ejercicios: Array<Ejercicio> = []

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private rutinaService: RutinaService,
    private ejercicioService: EjercicioService
  ) { }

  darRutinas(): void {
  }


  rutinaCrear(): void {
    this.routerPath.navigate(['/rutina/crear/']);
  }
  elegir(rutina: Rutina): void {
      this.elegida = true;
      this.rutinaElegida = rutina;
  }
  rutinaEditar(idRutina: number): void {

  }
  rutinaEliminar(idRutina: number): void {

  }

  ngOnInit() {
    this.rutinaService.darRutinas().subscribe((rutinas:Rutina[])=>{
      this.rutinas = rutinas;
      console.log("rutina elegida:", this.rutinaElegida);
      const rutinaId = parseInt(this.router.snapshot.params['id']);
      if(!(rutinaId==null)) {
        for(let i=0;i<this.rutinas.length;i++) {
          if(this.rutinas[i].id==rutinaId) {
            this.elegida = true;
              this.rutinaElegida = this.rutinas[i];
              console.log("rutina elegidasss", this.rutinaElegida);
          }
        }
      }
    });
  }

}
