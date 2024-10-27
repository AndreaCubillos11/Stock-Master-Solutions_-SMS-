import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/models/producto.model';

@Injectable()

export class ProductosService {
  apiUrl='/api/Productos'

  

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

  modificarProducto(producto: Producto): Observable<void> {
    const url = `${this.apiUrl}/${producto.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<void>(url, producto, {
      headers: headers,
      withCredentials: true
    });
  }

}
