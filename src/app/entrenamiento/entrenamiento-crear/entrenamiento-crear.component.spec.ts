/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntrenamientoCrearComponent } from './entrenamiento-crear.component';

describe('EntrenamientoCrearComponent', () => {
  let component: EntrenamientoCrearComponent;
  let fixture: ComponentFixture<EntrenamientoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrenamientoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenamientoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
