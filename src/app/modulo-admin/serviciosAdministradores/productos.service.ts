import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Producto } from 'src/models/producto.model';

@Injectable()

export class ProductosService {
  apiUrl = '/api/Productos'

  constructor(private http: HttpClient) { }


  nuevoProducto(token: any, data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }

  modificarProducto(producto: Producto, token: any): Observable<boolean> {
    console.log(producto);
    console.log('Modificando producto con ID:', producto.productoId);
    const url = `${this.apiUrl}/${producto.productoId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<void>(url, producto, { headers: headers, withCredentials: true }).pipe(
      map(response => {
        console.log('Respuesta de modificación:', response);
        return response !== null; // Devuelve true si la respuesta no es nula
      }),
      catchError(error => {
        console.error('Error en la modificación del producto:', error);
        return throwError(() => new Error('Error en la modificación del producto')); // Lanza el error
      })
    );
  }

  deleteProducto(codigoBarras: number, token: any): Observable<boolean> {
    const url = `${this.apiUrl}/codigoBarras/${codigoBarras}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<boolean>(url, { headers: headers, withCredentials: true }).pipe(
      map(response => {
        console.log('Response:', response); // Log de respuesta
        return response === null;
      }),
      catchError(error => {
        console.error('Error al eliminar el producto:', error);
        return of(false); // Retorna false en caso de error
      })
    );

  }

  getAllProductos(token: any): Observable<Producto[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Producto[]>(this.apiUrl, { headers: headers, withCredentials: true });
  }

  consultarProducto(token: any, codigoBarra: any): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + '/producto/codigo/' + codigoBarra,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }
}