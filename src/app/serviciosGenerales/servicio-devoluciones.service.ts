import { Injectable } from '@angular/core';
import { Devolucion } from 'src/models/devolucion.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
 
@Injectable({
  providedIn: 'root'
})
export class ServicioDevolucionesService {
  private apiUrl = '/api/Devoluciones';
 
  constructor(private http: HttpClient) { }
 
  getAllDevoluciones(token:any): Observable<Devolucion[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Devolucion[]>(this.apiUrl, {
      headers: headers,
      withCredentials: true
    });
  }
}