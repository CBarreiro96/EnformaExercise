/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { faker } from '@faker-js/faker';
import { EntrenadorListaComponent } from './entrenador-lista.component';
import { EncabezadoComponent } from '../../encabezado-app/encabezado/encabezado.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Entrenador } from '../entrenador';
import { EntrenadorService } from '../entrenador.service';
import { of } from 'rxjs';

describe('EntrenadorListaComponent', () => {
  let component: EntrenadorListaComponent;
  let fixture: ComponentFixture<EntrenadorListaComponent>;
  let entrenadorService: EntrenadorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NgbPaginationModule],
      declarations: [EntrenadorListaComponent, EncabezadoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenadorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 10 entrenadores', () => {});

  it('should be load entrenadores', () => {
    const entrenadores: Entrenador[] = [
      new Entrenador(
        faker.datatype.number(),
        faker.name.firstName(),
        faker.name.lastName(),
        faker.address.direction(),
        faker.phone.number(),
        [],
        []
      ),
    ];
    entrenadorService = TestBed.get<EntrenadorService>(EntrenadorService);
    spyOn(entrenadorService, 'darEntrenadores').and.returnValue(of(entrenadores));
    component.ngOnInit();
    expect(component.entrenadores).toEqual(entrenadores);
  });
});
