import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alerta } from 'src/models/alerta.model';

@Injectable({
  providedIn: 'root'
})

export class ServicioAlertasService {
  private apiUrl = '/api/AlertasInventario';

  constructor(private http: HttpClient) { }

  getAlertas(token: string): Observable<Alerta[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Alerta[]>(this.apiUrl,{headers: headers, withCredentials:true});
  }
}
