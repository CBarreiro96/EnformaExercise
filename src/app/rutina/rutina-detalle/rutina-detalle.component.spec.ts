/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RutinaDetalleComponent } from './rutina-detalle.component';

describe('RutinaDetalleComponent', () => {
  let component: RutinaDetalleComponent;
  let fixture: ComponentFixture<RutinaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct rutina nombre and descripcion', () => {
    const nombreElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    const descripcionElement = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(nombreElement.textContent).toContain(component.rutinaDetalle.nombre);
    expect(descripcionElement.textContent).toContain(component.rutinaDetalle.descripcion);
  });

/*   it('should display rutinaDetalle correctly', () => {
    const rutinaDetalle: Rutina = {
      nombre: 'Test Rutina',
      descripcion: 'Descripción de la test rutina'
    };

    component.rutinaDetalle = rutinaDetalle;
    fixture.detectChanges();

    const nombreElement = fixture.nativeElement.querySelector('h2');
    const descripcionElement = fixture.nativeElement.querySelector('p');

    expect(nombreElement.textContent).toContain(rutinaDetalle.nombre);
    expect(descripcionElement.textContent).toContain(rutinaDetalle.descripcion);
  }); */

  it('should not display anything if rutinaDetalle is undefined', () => {
    component.rutinaDetalle = undefined;
    fixture.detectChanges();

    const nombreElement = fixture.nativeElement.querySelector('h2');
    const descripcionElement = fixture.nativeElement.querySelector('p');

    expect(nombreElement).toBeFalsy();
    expect(descripcionElement).toBeFalsy();
  });

});
