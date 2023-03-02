/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';
import { RutinaDetalleComponent } from './rutina-detalle.component';
import { Ejercicio } from 'src/app/ejercicio/ejercicio';

describe('RutinaDetalleComponent', () => {
  let component: RutinaDetalleComponent;
  let fixture: ComponentFixture<RutinaDetalleComponent>;
  let variable1 = faker.datatype.string(50)
  let variable2 = faker.datatype.string(100)

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaDetalleComponent);
    component = fixture.componentInstance;
    component.rutinaDetalle = {
      id: 1,
      nombre: variable1,
      descripcion: variable2,
      ejercicio: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name and description', () => {
    let h2 = fixture.debugElement.query(By.css('h2'));
    let p = fixture.debugElement.query(By.css('p'));

    let h2Text = h2.nativeElement.textContent;
    let pText = p.nativeElement.textContent;

    expect(h2Text).toEqual(variable1);
    expect(pText).toEqual(variable2);
  });

  it('should not display anything if rutinaDetalle is undefined', () => {
    component.rutinaDetalle = undefined;
    fixture.detectChanges();

    const nombreElement = fixture.nativeElement.querySelector('h2');
    const descripcionElement = fixture.nativeElement.querySelector('p');

    expect(nombreElement).toBeFalsy();
    expect(descripcionElement).toBeFalsy();
  });

});
