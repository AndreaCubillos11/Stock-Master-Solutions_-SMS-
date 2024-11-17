import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from 'src/models/producto.model';  // Asegúrate de que el modelo Producto esté importado
import { ProductosService } from '../modulo-admin/serviciosAdministradores/productos.service';  // Asegúrate de que el servicio esté importado
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'productoNombre',
  pure: false  // Para que se actualice cuando cambie el valor del token o el productoId
})
export class ProductoNombrePipe implements PipeTransform {

  constructor(private productosService: ProductosService) { }

  transform(productoId: number, token: string): Observable<string> {
    return this.productosService.getProducto(token, productoId).pipe(
      map((producto: Producto) => producto ? producto.nombreProducto : 'Producto no encontrado')
    );
  }
}
