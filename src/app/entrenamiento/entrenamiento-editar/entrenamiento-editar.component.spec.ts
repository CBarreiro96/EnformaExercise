/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntrenamientoEditarComponent } from './entrenamiento-editar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EncabezadoComponent } from 'src/app/encabezado-app/encabezado/encabezado.component';

describe('EntrenamientoEditarComponent', () => {
  let component: EntrenamientoEditarComponent;
  let fixture: ComponentFixture<EntrenamientoEditarComponent>;

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
        EntrenamientoEditarComponent,
        EncabezadoComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenamientoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
