/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RutinaCrearComponent } from './rutina-crear.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { EncabezadoComponent } from 'src/app/encabezado-app/encabezado/encabezado.component';
import { faker } from '@faker-js/faker';


describe('RutinaCrearComponent', () => {
  let component: RutinaCrearComponent;
  let fixture: ComponentFixture<RutinaCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ 
        RutinaCrearComponent,
        EncabezadoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // La primera prueba verifica que el componente haya sido creado con éxito.

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // La segunda prueba verifica que los controles del formulario sean inválidos cuando están vacíos.
  
  it('form and controls invalid when empty', () => {
    expect(component.rutinaForm.valid).toBeFalsy();
    expect(component.nombre?.valid).toBeFalsy();
    expect(component.descripcion?.valid).toBeFalsy();
  });
  
  // La tercera prueba verifica que el formulario sea válido cuando se ha completado con datos.
  
  it('form valid when is full', () => {
    // Se completan los campos del formulario con datos aleatorios utilizando la librería Faker.
    component.nombre?.setValue(faker.datatype.string(50));
    component.descripcion?.setValue(faker.datatype.string(50));
  
    // Se verifica que el formulario sea válido.
    expect(component.rutinaForm.valid).toBeTruthy()
  });
});
