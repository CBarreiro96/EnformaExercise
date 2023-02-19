/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntrenadorListaComponent } from './entrenador-lista.component';
import { EncabezadoComponent } from '../../encabezado-app/encabezado/encabezado.component';
import { HttpClientModule } from '@angular/common/http';

describe('EntrenadorListaComponent', () => {
  let component: EntrenadorListaComponent;
  let fixture: ComponentFixture<EntrenadorListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
});
