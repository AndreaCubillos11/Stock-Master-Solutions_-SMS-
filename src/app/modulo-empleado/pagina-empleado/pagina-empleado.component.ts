import { Component, OnInit } from '@angular/core';
import { InventariosService } from 'src/app/modulo-admin/serviciosAdministradores/inventarios.service';
import { Inventario } from 'src/models/inventario.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-empleado',
  templateUrl: './pagina-empleado.component.html',
  styleUrls: ['./pagina-empleado.component.css']
})
export class PaginaEmpleadoComponent implements OnInit{

  datosTabla = [
    {
      datos: [] as Inventario[],
      seleccionable: false,
    }
  ];

  inventarios: Inventario[] = [
    /* {
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
    } */
  ];

  datosBtn = [
    { texto: 'Agregar devolucion', img: 'Añadir.svg', nombreClase: 'agregar', accion: this.agregarDevolucion.bind(this) },
    { texto: 'Modificar cantidad de inventario', img: 'ModificarInventario.svg', nombreClase: 'modificar', accion: this.modificarInventario.bind(this) },
  ];

  constructor(private inventarioService: InventariosService, private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    this.getInventarios();
  }

  agregarDevolucion() {
    console.log('Agregar devolucion');
    this.router.navigate(['/devoluciones']);
  }

  modificarInventario() {
    console.log('Modificar inventario');
    //this.router.navigate(['/modificarProducto']);
  }

  getInventarios() {//Quitar el 55 en los parametros y poner el id de tienda del usuario
    this.inventarioService.getInventariosTienda(this.cookieService.get('Token'), 55).subscribe((data: Inventario[]) => {
      this.inventarios = data;
    });
  }

}
