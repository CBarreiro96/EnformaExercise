/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EjercicioListaComponent } from './ejercicio-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { EncabezadoComponent } from 'src/app/encabezado-app/encabezado/encabezado.component';
import { Ejercicio } from '../ejercicio';
import { faker } from '@faker-js/faker';
import { EjercicioService } from '../ejercicio.service';
import { of } from 'rxjs';

describe('EjercicioListaComponent', () => {
  let component: EjercicioListaComponent;
  let fixture: ComponentFixture<EjercicioListaComponent>;
  let ejercicioService: EjercicioService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ToastrModule.forRoot()],
      declarations: [EjercicioListaComponent, EncabezadoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be load ejercicios', () => {
    const entrenadores: Ejercicio[] = [
      new Ejercicio(
        faker.datatype.number(),
        faker.lorem.word(),
        faker.lorem.paragraph(),
        faker.internet.url(),
        faker.datatype.number()
      ),
    ];
    ejercicioService = TestBed.get<EjercicioService>(EjercicioService);
    spyOn(ejercicioService, 'darEjercicios').and.returnValue(of(entrenadores));
    component.ngOnInit();
    expect(component.ejercicios).toEqual(entrenadores);
  });
});
