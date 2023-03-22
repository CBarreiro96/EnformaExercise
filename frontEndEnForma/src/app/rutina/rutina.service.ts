import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rutina } from './rutina';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  // Se define la URL base de la API a través de la variable de entorno "apiUrl"
  private apiUrl = environment.apiUrl;

  // Se define el constructor del servicio de Rutina, se inyecta el servicio HttpClient
  constructor(private http: HttpClient) { }

  // Este método se utiliza para crear una nueva rutina, recibe como parámetro un objeto Rutina
  // y devuelve un observable que emite la respuesta del servidor con la nueva rutina creada.
  crearRutina(rutina: Rutina, idUsuario: number): Observable<Rutina> {
    // Se construyen las cabeceras de la solicitud con el token de sesión
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    // Se realiza la solicitud HTTP POST a la API para crear una nueva rutina
    // Se utiliza la URL base definida en la variable "apiUrl" y se agrega la ruta específica para crear una rutina
    // Se envía el objeto Rutina como cuerpo de la solicitud y se incluyen las cabeceras previamente definidas
    return this.http.post<Rutina>(`${this.apiUrl}/rutina/${idUsuario}`, rutina, { headers: headers });
  }

  darRutinas ():Observable<Rutina[]>{
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<Rutina[]>(`${this.apiUrl}/rutinas/${idUsuario}`,  { headers: headers });
  }
}
