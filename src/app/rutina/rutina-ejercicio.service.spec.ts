/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RutinaEjercicioService } from './rutina-ejercicio.service';

describe('Service: RutinaEjercicio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutinaEjercicioService]
    });
  });

  it('should ...', inject([RutinaEjercicioService], (service: RutinaEjercicioService) => {
    expect(service).toBeTruthy();
  }));
});
