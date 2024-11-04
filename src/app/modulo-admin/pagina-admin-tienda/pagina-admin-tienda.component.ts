import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Inventario } from 'src/models/inventario.model';
import { Producto } from 'src/models/producto.model';
import { InventariosService } from '../serviciosAdministradores/inventarios.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pagina-admin-tienda',
  templateUrl: './pagina-admin-tienda.component.html',
  styleUrls: ['./pagina-admin-tienda.component.css']
})
export class PaginaAdminTiendaComponent {

  datosProducto = [
    {
      datos: [] as Producto[],
      seleccionable: false
    }
  ];

  datosInventario = [
    {
      datos: [] as Inventario[],
      seleccionable: false
    }
  ];

  selectedOption: string = 'optionInventario';
  mostrarInv: boolean = true;

  datosBtnInventario = [
    { texto: 'Agregar nuevo inventario', img: 'Añadir.svg', nombreClase: 'agregar', accion: this.agregarInventario.bind(this) },
    { texto: 'Modificar datos del inventario', img: 'ModificarInventario.svg', nombreClase: 'modificar', accion: this.modificarInventario.bind(this) },
    { texto: 'Modificar productos del inventario', img: 'ModificarProducto.svg', nombreClase: 'modificar', accion: this.modificarProducto.bind(this) },
    { texto: 'Eliminar inventario', img: 'Eliminar.svg', nombreClase: 'eliminar', accion: this.eliminarInventario.bind(this) }
  ];

  datosBtnProducto = [
    { texto: 'Agregar entidad producto', img: 'Añadir.svg', nombreClase: 'agregar', accion: this.agregarProducto.bind(this) },
    { texto: 'Modificar producto', img: 'ModificarProducto.svg', nombreClase: 'modificar', accion: this.modificarProducto.bind(this) },
    { texto: 'Eliminar producto', img: 'Eliminar.svg', nombreClase: 'eliminar', accion: this.eliminarProducto.bind(this) }
  ];

  constructor(private router: Router, private inventarioService: InventariosService, private cookieService: CookieService) {}

  agregarInventario() {
    console.log('Agregar nuevo producto');
    this.router.navigate(['/crearInventario']);
  }

  agregarProducto() {
    console.log('Agregar nuevo producto');
    this.router.navigate(['/crearProducto']);
  }

  modificarInventario() {
    console.log('Boton ModificarInventario');
  }

  modificarProducto() {
    console.log('Modificar datos de producto');
    this.router.navigate(['/modificarProducto']);
  }

  eliminarInventario() {
    console.log('Boton Eliminar Inventario');
  }

  eliminarProducto() {
    console.log('Eliminar producto');
    this.router.navigate(['/eliminarProducto']);
  }

  toggleCRUD() {
    console.log('presionado');
    this.mostrarInv = !this.mostrarInv;
  }

  getInventarios() {//Quitar el 55 en los parametros y poner el id de tienda del usuario
    this.inventarioService.getInventariosTienda(this.cookieService.get('Token'), 55).subscribe((data: Inventario[]) => {
      this.datosInventario[0].datos = data;
    });
  }
}
