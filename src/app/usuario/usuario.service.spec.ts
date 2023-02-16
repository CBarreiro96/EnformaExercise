/* tslint:disable:no-unused-variable */
<<<<<<< HEAD

import { HttpClientModule } from '@angular/common/http';
=======
import { HttpClientTestingModule } from '@angular/common/http/testing';
>>>>>>> 2cbb3755f4dc7583e5e35c22963d1fbc4040ab79
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioService } from './usuario.service';

describe('Service: Usuario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [UsuarioService]
=======
      imports: [HttpClientTestingModule],
      providers: [UsuarioService],
>>>>>>> 2cbb3755f4dc7583e5e35c22963d1fbc4040ab79
    });
  });

  it('should ...', inject([UsuarioService], (service: UsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
