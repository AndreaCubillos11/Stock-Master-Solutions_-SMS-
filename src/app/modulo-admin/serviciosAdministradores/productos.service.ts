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
    const url = `${this.apiUrl}/producto/id/${producto.productoId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put(this.apiUrl, producto, { headers, withCredentials: true }).pipe(
      map(() => true), // Si el PUT es exitoso, retorna true
      catchError((error) => {
        console.error('Error en la modificación:', error);
        return throwError(() => error.statusText); // Reenvía el error para ser manejado
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

  getProducto(token: string, id: number): Observable<Producto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Producto>(`${this.apiUrl}/producto/id/${id}`,{ headers: headers, withCredentials: true });
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