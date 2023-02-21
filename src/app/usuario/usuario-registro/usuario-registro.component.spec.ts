/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsuarioRegistroComponent } from './usuario-registro.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { faker } from '@faker-js/faker';


describe('UsuarioRegistroComponent', () => {
  let debug: DebugElement;
  let component: UsuarioRegistroComponent;
  let fixture: ComponentFixture<UsuarioRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule, ToastrModule.forRoot()],
      declarations: [UsuarioRegistroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form and controls invalid when empty', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
    expect(component.usuario?.valid).toBeFalsy();
    expect(component.password?.valid).toBeFalsy();
    expect(component.nombre?.valid).toBeFalsy();
    expect(component.apellido?.valid).toBeFalsy();
  });

  it('form valid when is full', () => {
    component.usuario?.setValue(faker.datatype.string(50));
    component.password?.setValue(faker.datatype.string(50));
    component.confirmpassword?.setValue(faker.datatype.string(50))
    component.nombre?.setValue(faker.datatype.string(60));
    component.apellido?.setValue(faker.datatype.string(60));

    expect(component.usuarioForm.valid).toBeTruthy()
  });
});
