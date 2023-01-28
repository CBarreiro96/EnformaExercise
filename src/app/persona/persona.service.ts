import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'
import { Persona } from './persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  darPersonas(): Observable<Persona[]> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Persona[]>(`${this.apiUrl}/personas/${idUsuario}`, { headers: headers })
  }

  crearPersona(persona: Persona): Observable<Persona> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.post<Persona>(`${this.apiUrl}/personas/${idUsuario}`, persona, { headers: headers })
  }

  darPersona(id: number): Observable<Persona> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Persona>(`${this.apiUrl}/persona/${id}`, { headers: headers })
  }

  editarPersona(persona: Persona): Observable<Persona> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.put<Persona>(`${this.apiUrl}/persona/${persona.id}`, persona, { headers: headers })
  }

  eliminarPersona(id: number): Observable<Persona> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.delete<Persona>(`${this.apiUrl}/persona/${id}`, { headers: headers })
  }

  darReporte(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Persona>(`${this.apiUrl}/persona/${id}/reporte`, { headers: headers })

  }

}
