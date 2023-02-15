/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntrenamientoService } from './entrenamiento.service';

describe('Service: Entrenamiento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EntrenamientoService],
    });
  });

  it('should ...', inject(
    [EntrenamientoService],
    (service: EntrenamientoService) => {
      expect(service).toBeTruthy();
    }
  ));
});
