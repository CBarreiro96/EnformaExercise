/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RutinaListaComponent } from './rutina-lista.component';

describe('RutinaListaComponent', () => {
  let component: RutinaListaComponent;
  let fixture: ComponentFixture<RutinaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
