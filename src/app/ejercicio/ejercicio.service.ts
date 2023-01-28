import { Ejercicio } from 'src/app/ejercicio/ejercicio';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  darEjercicios(): Observable<Ejercicio[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Ejercicio[]>(`${this.apiUrl}/ejercicios`, { headers: headers })
  }

  crearEjercicio(ejercicio): Observable<Ejercicio> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.post<Ejercicio>(`${this.apiUrl}/ejercicios`, ejercicio, { headers: headers })
  }

  darEjercicio(id: number): Observable<Ejercicio> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Ejercicio>(`${this.apiUrl}/ejercicio/${id}`, { headers: headers })
  }

  editarEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.put<Ejercicio>(`${this.apiUrl}/ejercicio/${ejercicio.id}`, ejercicio, { headers: headers });

  }

  eliminarEjercicio(id: number): Observable<Ejercicio> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.delete<Ejercicio>(`${this.apiUrl}/ejercicio/${id}`, { headers: headers });

  }

}
