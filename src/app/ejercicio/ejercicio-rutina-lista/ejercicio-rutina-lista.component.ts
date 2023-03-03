import { Component, Input, OnInit } from '@angular/core';
import { Rutina } from 'src/app/rutina/rutina';
import { Ejercicio } from '../ejercicio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EjercicioService } from '../ejercicio.service';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ejercicio-rutina-lista',
  templateUrl: './ejercicio-rutina-lista.component.html',
  styleUrls: ['./ejercicio-rutina-lista.component.css'],
})
export class EjercicioRutinaListaComponent implements OnInit {
  @Input() rutinaDetalle: Rutina;
  @Input() ejercicios: Array<Ejercicio>;
  ejercicioForm!: FormGroup;
  ejerciciosCatalogo: Array<Ejercicio>;

  constructor(
    private ejercicioService: EjercicioService,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.ejercicioForm = this.formBuilder.group({
      ejercicio: ['', [Validators.required]],
    });
    this.ejercicioService.darEjercicios().subscribe((ejerciciosCatalogo) => {
      this.ejerciciosCatalogo = ejerciciosCatalogo;
    });
  }

  ejercicioCrear(content) {
    this.modal
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          let ejercicioId = this.ejercicioForm.get('ejercicio')?.value;
          //TODO: llamar servicio para registrar ejercicio
          // El servicio debe validar que no se repita el ejercicio
          this.toastrService.success(
            'Ejercicio registrado con exito',
            'Información',
            {
              closeButton: true,
            }
          );
          this.ejercicioForm.reset({ ejercicio: '' });
        },
        (reason) => {
          this.ejercicioForm.reset({ ejercicio: '' });
        }
      );
  }
}
