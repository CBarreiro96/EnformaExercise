/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonaReporteComponent } from './persona-reporte.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { EncabezadoComponent } from 'src/app/encabezado-app/encabezado/encabezado.component';

describe('PersonaReporteComponent', () => {
  let component: PersonaReporteComponent;
  let fixture: ComponentFixture<PersonaReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [ 
        PersonaReporteComponent,
        EncabezadoComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
