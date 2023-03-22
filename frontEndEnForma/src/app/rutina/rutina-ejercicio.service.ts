import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RutinaEjercicioService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  agregarEjercicio(rutinaId: number, ejercicioId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.httpClient.put<any>(
      `${this.apiUrl}/rutina-ejercicio`,
      { id_rutina: rutinaId, id_ejercicio: ejercicioId },
      { headers }
    );
  }
}
