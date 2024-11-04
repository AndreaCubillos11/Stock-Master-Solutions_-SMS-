import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Inventario } from 'src/models/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {
  apiUrl = '/api/Inventarios'

  constructor(private http: HttpClient) { }

  agregarInventario(token: string,inventario: Inventario): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<boolean>(this.apiUrl, inventario, { headers: headers, withCredentials: true });
  }

  getInventariosTienda(token: string, idTienda: number): Observable<Inventario[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Inventario[]>(`${this.apiUrl}/${idTienda}`, { headers: headers, withCredentials: true });
  }
}
