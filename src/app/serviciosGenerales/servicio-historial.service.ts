import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovimientoInventario } from 'src/models/movimientoInventario.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioHistorialService {
  private apiUrl = ' https://dionegestionapi.azurewebsites.net//api/MovimientosInventarios';

  constructor(private http: HttpClient) { }

  getAllMovimientos(token: string): Observable<MovimientoInventario[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<MovimientoInventario[]>(this.apiUrl, { headers: headers, withCredentials: true });
  }

  getMovimientosTienda(token: string, idTienda: number): Observable<MovimientoInventario[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<MovimientoInventario[]>(`${this.apiUrl}/Tienda/${idTienda}`, { headers: headers, withCredentials: true });
  }

}
