import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriaProducto'
})
export class CategoriaProductoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
