/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EjercicioCrearComponent } from './ejercicio-crear.component';

describe('EjercicioCrearComponent', () => {
  let component: EjercicioCrearComponent;
  let fixture: ComponentFixture<EjercicioCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjercicioCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
