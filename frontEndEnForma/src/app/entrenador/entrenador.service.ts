import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrenador } from './entrenador';
import {Persona} from "../persona/persona";

@Injectable({
  providedIn: 'root',
})
export class EntrenadorService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  darEntrenadores(): Observable<Entrenador[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<Entrenador[]>(`${this.apiUrl}/entrenadores`, {
      headers: headers,
    });
  }
  eliminarentrenador(id: number): Observable<Entrenador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.delete<Entrenador>(`${this.apiUrl}/entrenador/${id}`, { headers: headers })
  }
}
