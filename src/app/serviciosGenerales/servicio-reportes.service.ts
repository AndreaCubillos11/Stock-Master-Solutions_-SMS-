import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Producto } from 'src/models/producto.model';
import { ReporteProducto } from 'src/models/reporteProductos.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioReportesService {
  apiUrl = '/api/Movimientos'

  constructor(private http: HttpClient) {}

  consultarProducto(token: string, idProducto: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<Producto>(`/api/Productos/producto/id/${idProducto}`, { headers: headers, withCredentials: true })
      .pipe(
        map(response => response.nombreProducto)
      );
  }

  /* productosMasVendidosPorTienda(token: string, idTienda: number): Observable<ReporteProducto[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ReporteProducto[]>(`${this.apiUrl}/productoMasVendido/${idTienda}`, { headers: headers, withCredentials: true })
      .pipe(
        map(reportes => reportes.slice(0, 5)), // Selecciona los primeros 5 productos
        switchMap(reportes => {
          const observables = reportes.map(reporte =>
            this.consultarProducto(token, reporte.productoId).pipe(
              map(nombreProducto => ({
                ...reporte,
                nombreProducto
              })),
              catchError(error => {
                console.error(`Error al obtener el nombre del producto con ID ${reporte.productoId}:`, error);
                return of({ ...reporte, nombreProducto: 'Desconocido' });
              })
            )
          );
          return forkJoin(observables);
        })
      );
  } */
  
  productosVendidosPorTienda(token: string, opcion:number ,idTienda: number): Observable<ReporteProducto[]> {
    let endPoint!: string;
    if (opcion == 1) {
      endPoint = '/productoMasVendido/';
    }else if(opcion == 2){
      endPoint = '/productoMenosVendido/';
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ReporteProducto[]>(`${this.apiUrl}${endPoint}${idTienda}`, { headers: headers, withCredentials: true })
    .pipe(
      map(reportes => reportes.slice(0, 5)), // Selecciona los primeros 5 productos
      switchMap(reportes => {
        const observables = reportes.map(reporte =>
          this.consultarProducto(token, reporte.productoId).pipe(
            map(nombreProducto => ({
              ...reporte,
              nombreProducto
            })),
            catchError(error => {
              console.error(`Error al obtener el nombre del producto con ID ${reporte.productoId}:`, error);
              return of({ ...reporte, nombreProducto: 'Desconocido' });
            })
          )
        );
        return forkJoin(observables);
      })
    );
  }

}
