/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { PersonaService } from './persona.service';

describe('Service: Persona', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonaService]
    });
  });

  it('should ...', inject([PersonaService], (service: PersonaService) => {
    expect(service).toBeTruthy();
  }));
});
