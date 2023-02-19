import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rutina } from './rutina';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  crearRutina(rutina: Rutina): Observable<Rutina> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.post<Rutina>(`${this.apiUrl}/rutinas`, rutina, { headers: headers })
  }

}
