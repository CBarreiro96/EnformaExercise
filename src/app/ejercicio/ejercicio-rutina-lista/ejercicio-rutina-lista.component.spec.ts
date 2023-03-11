/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EjercicioRutinaListaComponent } from './ejercicio-rutina-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('EjercicioRutinaListaComponent', () => {
  let component: EjercicioRutinaListaComponent;
  let fixture: ComponentFixture<EjercicioRutinaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EjercicioRutinaListaComponent],
      imports: [HttpClientModule, ToastrModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioRutinaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
