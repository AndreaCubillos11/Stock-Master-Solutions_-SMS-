import { Component } from '@angular/core';
import { Producto } from 'src/models/producto.model';

@Component({
  selector: 'app-pagina-eliminar-producto',
  templateUrl: './pagina-eliminar-producto.component.html',
  styleUrls: ['./pagina-eliminar-producto.component.css']
})
export class PaginaEliminarProductoComponent {
  datosHeader = [
    { titulo: 'Eliminar Producto', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  datos:Producto[] = [];

  seleccionable = true;
  selectedRow: Producto | null = null;

  onSelectionChange(selected: Producto | null) {
    this.selectedRow = selected;
  }

}
