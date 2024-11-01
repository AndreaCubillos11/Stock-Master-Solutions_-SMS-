import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from 'src/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CompartirFilaService {
  private selectedProductoSource = new BehaviorSubject<Producto | null>(null);
  selectedProducto$ = this.selectedProductoSource.asObservable();

  selectProducto(producto: Producto) {
    this.selectedProductoSource.next(producto);
  }
  
  constructor() { }
}
