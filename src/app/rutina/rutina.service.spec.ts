/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RutinaService } from './rutina.service';

describe('Service: Rutina', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutinaService],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
    });
  });

  it('should ...', inject([RutinaService], (service: RutinaService) => {
    expect(service).toBeTruthy();
  }));
});
