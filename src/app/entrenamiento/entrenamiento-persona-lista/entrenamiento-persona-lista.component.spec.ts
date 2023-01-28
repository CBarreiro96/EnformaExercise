/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntrenamientoPersonaListaComponent } from './entrenamiento-persona-lista.component';

describe('EntrenamientoPersonaListaComponent', () => {
  let component: EntrenamientoPersonaListaComponent;
  let fixture: ComponentFixture<EntrenamientoPersonaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrenamientoPersonaListaComponent ]
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
