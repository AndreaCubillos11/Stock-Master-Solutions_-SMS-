import { Component } from '@angular/core';
import { Inventario } from 'src/models/inventario.model';

@Component({
  selector: 'app-pagina-empleado',
  templateUrl: './pagina-empleado.component.html',
  styleUrls: ['./pagina-empleado.component.css']
})
export class PaginaEmpleadoComponent {
  inventarios: Inventario[] = [
    {
        id: 1,
        productoId: 101,
        tiendaId: 1,
        cantidad: 50,
        cantidadMinima: 10,
        cantidadBodega: 100,
        ubicacionTienda: 'Pasillo A - Estante 5',
        fechaUltimaActualizacion: new Date('2023-10-10')
    },
    {
        id: 2,
        productoId: 102,
        tiendaId: 1,
        cantidad: 30,
        cantidadMinima: 5,
        cantidadBodega: 80,
        ubicacionTienda: 'Pasillo B - Estante 2',
        fechaUltimaActualizacion: new Date('2023-10-12')
    },
    {
        id: 3,
        productoId: 103,
        tiendaId: 2,
        cantidad: 20,
        cantidadMinima: 8,
        cantidadBodega: 60,
        ubicacionTienda: 'Pasillo C - Estante 1',
        fechaUltimaActualizacion: new Date('2023-10-15')
    }
  ];

  datosBtn = [
    { texto: 'Agregar devolucion', img: 'Añadir.svg', nombreClase: 'agregar', accion: this.agregarDevolucion.bind(this)},
    { texto: 'Modificar cantidad de inventario', img: 'ModificarInventario.svg', nombreClase: 'modificar', accion: this.modificarInventario.bind(this)},
  ];

  agregarDevolucion() {
    console.log('Agregar devolucion');
    //this.router.navigate(['/crearProducto']);
  }

  modificarInventario() {
    console.log('Modificar inventario');
    //this.router.navigate(['/modificarProducto']);
  }

}
