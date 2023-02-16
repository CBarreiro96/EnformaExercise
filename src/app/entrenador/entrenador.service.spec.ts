/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { EntrenadorService } from './entrenador.service';

describe('Service: Entrenador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EntrenadorService],
    });
  });

  it('should ...', inject([EntrenadorService], (service: EntrenadorService) => {
    expect(service).toBeTruthy();
  }));
});
