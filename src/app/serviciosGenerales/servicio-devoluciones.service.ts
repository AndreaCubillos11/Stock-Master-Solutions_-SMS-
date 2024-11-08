import { Injectable } from '@angular/core';
import { Devolucion } from 'src/models/devolucion.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ReporteDevolucion } from 'src/models/reporteDevoluciones.model';
 
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

  getReporteDevoluciones(token: any): Observable<ReporteDevolucion[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<Devolucion[]>(this.apiUrl, {
      headers: headers,
      withCredentials: true
    }).pipe(
      map((devoluciones: Devolucion[]) =>
        devoluciones.map(devolucion => ({
          id: devolucion.id,
          productoId: devolucion.productoId,
          tiendaId: devolucion.tiendaId,
          razon: devolucion.razon,
          fechaDevolucion: devolucion.fechaDevolucion
        }))
      )
    );
  }
}