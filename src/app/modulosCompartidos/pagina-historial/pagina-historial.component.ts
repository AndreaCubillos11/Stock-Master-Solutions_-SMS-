import { Component } from '@angular/core';
import { Devolucion } from 'src/models/devolucion.model';
import { MovimientoInventario } from 'src/models/movimientoInventario.model';

@Component({
  selector: 'app-pagina-historial',
  templateUrl: './pagina-historial.component.html',
  styleUrls: ['./pagina-historial.component.css']
})
export class PaginaHistorialComponent {
  datosHeader = [
    { titulo: 'Historial productos', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver'},
  ];

  historial: MovimientoInventario[] = [];
  devoluciones: Devolucion[] = [];
  datos: Array<MovimientoInventario | Devolucion> = [];
  mostrandoDevoluciones: boolean = false;

  toggleDevoluciones() {
    this.mostrandoDevoluciones = !this.mostrandoDevoluciones;
    this.datos = this.mostrandoDevoluciones ? this.devoluciones : this.historial;
    this.datosHeader[0].titulo = this.mostrandoDevoluciones ? 'Historial devoluciones' : 'Historial productos';
  }
}
