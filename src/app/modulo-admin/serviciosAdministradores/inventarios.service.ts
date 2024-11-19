import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Inventario } from 'src/models/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {
  apiUrl = ' https://dionegestionapi.azurewebsites.net/api/Inventarios'

  constructor(private http: HttpClient) { }

  agregarInventario(token: string,inventario: Inventario): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrl, inventario, { headers: headers, withCredentials: false });
  }

  getInventario(token: string, idInventario: number): Observable<Inventario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Inventario>(`${this.apiUrl}/${idInventario}`, { headers: headers, withCredentials: false});
  }

  getInventariosTienda(token: string, idTienda: number): Observable<Inventario[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Inventario[]>(`${this.apiUrl}/Tienda/${idTienda}`, { headers: headers, withCredentials: false });
  }

  actualizarInventario(token: any, data: any):Observable<any> {
    return this.http.put<any>(
      this.apiUrl,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }

  consultarInventario(token: any, idProducto:any){
    return this.http.get<any>(
      this.apiUrl+'/producto/'+idProducto,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }

  consultarInventarioTienda(token: any, idTienda:any){
    return this.http.get<any>(
      this.apiUrl+'/Tienda/'+idTienda,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }
  
  eliminarInventario(token: any, id: any): Observable<any> {
    return this.http.delete<any>(
      this.apiUrl + '/inventario/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }
}
