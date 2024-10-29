import { Component } from '@angular/core';
import { Producto } from 'src/models/producto.model';

@Component({
  selector: 'app-pagina-modificar-producto',
  templateUrl: './pagina-modificar-producto.component.html',
  styleUrls: ['./pagina-modificar-producto.component.css']
})
export class PaginaModificarProductoComponent {
  datosHeader = [
    { titulo: 'Modificar productos', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  datos:Producto[] = [];

  seleccionable = true;
  selectedRow: Producto | null = null;
  mostrarTemplate1 = true;

  onSelectionChange(selected: Producto | null) {
    this.selectedRow = selected;
  }

  onModificarClick() {
    this.mostrarTemplate1 = false;
  }
}
