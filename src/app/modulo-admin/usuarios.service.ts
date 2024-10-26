import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  apiUri='/api/Usuarios'

  constructor(private http: HttpClient,

  ) { }

  nuevoUsuario(token: any, data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
        }
      });
  }
}
