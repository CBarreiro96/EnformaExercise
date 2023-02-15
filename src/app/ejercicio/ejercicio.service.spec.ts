/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EjercicioService } from './ejercicio.service';

describe('Service: Ejercicio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EjercicioService],
    });
  });

  it('should ...', inject([EjercicioService], (service: EjercicioService) => {
    expect(service).toBeTruthy();
  }));
});
