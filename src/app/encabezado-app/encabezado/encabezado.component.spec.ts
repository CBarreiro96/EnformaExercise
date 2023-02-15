/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EncabezadoComponent } from './encabezado.component';

describe('EncabezadoComponent', () => {
  let component: EncabezadoComponent;
  let fixture: ComponentFixture<EncabezadoComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EncabezadoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 3 menu items for Administrador role', () => {
    //entrenadores, ejercicios y salir
    component.userRole = 'Administrador';
    fixture.detectChanges();
    let menu = debug.queryAll(By.css('a.nav-link'));
    expect(menu[0].nativeElement.textContent).toEqual('Entrenadores');
    expect(menu[1].nativeElement.textContent).toEqual('Ejercicios');
    expect(menu[2].nativeElement.textContent).toEqual('Salir');
  });

  it('should show 4 menu items for Entrenador role', () => {
    //personas, ejercicios, rutinas y salir
    component.userRole = 'Entrenador';
    fixture.detectChanges();
    let menu = debug.queryAll(By.css('a.nav-link'));
    expect(menu[0].nativeElement.textContent).toEqual('Personas');
    expect(menu[1].nativeElement.textContent).toEqual('Ejercicios');
    expect(menu[2].nativeElement.textContent).toEqual('Rutinas');
    expect(menu[3].nativeElement.textContent).toEqual('Salir');
  });
});
