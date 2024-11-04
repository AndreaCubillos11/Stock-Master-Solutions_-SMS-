import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-devoluciones',
  templateUrl: './pagina-devoluciones.component.html',
  styleUrls: ['./pagina-devoluciones.component.css']
})
export class PaginaDevolucionesComponent {

  productName: string = 'Nombre del Producto'; // Este es el nombre que se renderiza en el h2
  estados = ['Nuevo', 'Ligeramente nuevo', 'Usado', 'Defectuoso'];
  
  datosHeader = [
    { titulo: 'Agregar Devolucion', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];
}
