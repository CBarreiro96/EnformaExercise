/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonaRegistroComponent } from './persona-registro.component';
import {PersonaService} from "../persona.service";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {catchError, of, throwError} from "rxjs";
import {faker} from "@faker-js/faker";

describe('PersonaRegistroComponent', () => {
  let component: PersonaRegistroComponent;
  let fixture: ComponentFixture<PersonaRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaRegistroComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // La segunda prueba verifica que los controles del formulario sean inválidos cuando están vacíos.
  it('form and controls invalid when empty', () => {
    expect(component.personaForm.valid).toBeFalsy();
    expect(component.usuario?.valid).toBeFalsy();
    expect(component.password?.valid).toBeFalsy();
  });

  // La tercera prueba verifica que el formulario sea válido cuando se ha completado con datos.
  it('form valid when is full', () => {
    // Se completan los campos del formulario con datos aleatorios utilizando la librería Faker.
    component.usuario?.setValue(faker.datatype.string(50));
    component.password?.setValue(faker.datatype.string(50));
    component.confirmpassword?.setValue(faker.datatype.string(50))

    // Se verifica que el formulario sea válido.
    expect(component.personaForm.valid).toBeTruthy()
  });

});
