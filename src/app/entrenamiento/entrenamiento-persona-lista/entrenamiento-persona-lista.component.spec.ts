/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntrenamientoPersonaListaComponent } from './entrenamiento-persona-lista.component';
import { EncabezadoComponent } from 'src/app/encabezado-app/encabezado/encabezado.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('EntrenamientoPersonaListaComponent', () => {
  let component: EntrenamientoPersonaListaComponent;
  let fixture: ComponentFixture<EntrenamientoPersonaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [ 
        EntrenamientoPersonaListaComponent,
        EncabezadoComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenamientoPersonaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
