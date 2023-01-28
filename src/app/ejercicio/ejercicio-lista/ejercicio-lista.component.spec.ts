/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EjercicioListaComponent } from './ejercicio-lista.component';

describe('EjercicioListaComponent', () => {
  let component: EjercicioListaComponent;
  let fixture: ComponentFixture<EjercicioListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjercicioListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
