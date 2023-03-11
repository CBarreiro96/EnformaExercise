/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RutinaListaComponent } from './rutina-lista.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { EncabezadoComponent } from 'src/app/encabezado-app/encabezado/encabezado.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

describe('RutinaListaComponent', () => {
  let component: RutinaListaComponent;
  let fixture: ComponentFixture<RutinaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        HttpClientModule,
        NgbPaginationModule,
        RouterTestingModule,
      ],
      declarations: [RutinaListaComponent, EncabezadoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list', () => {
    const list = fixture.nativeElement.querySelector('ul');
    expect(list).toBeTruthy();
  });
});
