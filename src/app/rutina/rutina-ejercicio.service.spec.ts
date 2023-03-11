/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { RutinaEjercicioService } from './rutina-ejercicio.service';

describe('Service: RutinaEjercicio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutinaEjercicioService],
      imports: [ToastrModule.forRoot(), HttpClientModule],
    });
  });

  it('should ...', inject(
    [RutinaEjercicioService],
    (service: RutinaEjercicioService) => {
      expect(service).toBeTruthy();
    }
  ));
});
