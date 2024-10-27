import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  apiUri='/api/Usuarios'

  constructor(private http: HttpClient,

  ) { }

  nuevoUsuario(token: string, data: Usuario): Observable<any> {
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
