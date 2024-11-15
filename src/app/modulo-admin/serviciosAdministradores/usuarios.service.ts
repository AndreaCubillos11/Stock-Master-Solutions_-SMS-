import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  apiUri = '/api/Usuarios'

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
  consultarUsuario(token: any, id: any): Observable<any> {
    return this.http.get<any>(
      this.apiUri + '/usuario/id/'+id,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }
  modificarUsuario(token: any, data: any): Observable<any> {
    return this.http.put<any>(
      this.apiUri,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }
  eliminarUsuario(token: any, id:any): Observable<any> {
    return this.http.delete<any>(
      this.apiUri+'/usuario/id/'+id,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }

  consultarUsuarioPorCorreo(token: any, correo: any): Observable<any> {
    return this.http.get<any>(
      this.apiUri + '/usuario/correo/'+correo,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }

  getAllUsuarios(token: string): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Usuario[]>(this.apiUri, { headers: headers, withCredentials: true });
  }
}

