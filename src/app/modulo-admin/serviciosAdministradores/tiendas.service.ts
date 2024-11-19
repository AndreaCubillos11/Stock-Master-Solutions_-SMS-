import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  apiUri = ' https://dionegestionapi.azurewebsites.net//api/Tiendas'

  constructor(private http: HttpClient) { }


  getTienda(token: any): Observable<any> {
    return this.http.get(
      this.apiUri,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }
  consultarTienda(token: any, id: any): Observable<any> {
    return this.http.get<any>(
      this.apiUri +'/tienda/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }
  nuevaTienda(token: any, data: any): Observable<any> {
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
  modificarTienda(token: any, data: any): Observable<any> {
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
  eliminarTienda(token: any, id: any): Observable<any> {
    return this.http.delete<any>(
      this.apiUri + '/tienda/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }
  
}
