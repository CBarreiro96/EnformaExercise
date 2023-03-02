import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rutina } from '../rutina';
import { RutinaService } from '../rutina.service';

@Component({
  selector: 'app-rutina-lista',
  templateUrl: './rutina-lista.component.html',
  styleUrls: ['./rutina-lista.component.css']
})
export class RutinaListaComponent implements OnInit {

  rutinas:Array<Rutina> = []
  elegida: Boolean = false
  rutinaElegida: Rutina

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private rutinaService: RutinaService
  ) { }

  darRutinas(): void {
  }


  rutinaCrear(): void {
    this.routerPath.navigate(['/rutina/crear/']);
  }
  elegir(rutina: Rutina): void {
  }
  rutinaEditar(idRutina: number): void {

  }
  rutinaEliminar(idRutina: number): void {

  }

  ngOnInit() {
    this.rutinaService.darRutinas().subscribe((rutinas:Rutina[])=>{
      this.rutinas = rutinas;
    });
  }

}
