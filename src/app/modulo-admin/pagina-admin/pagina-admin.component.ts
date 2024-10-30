import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../serviciosAdministradores/usuarios.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { TiendasService } from '../serviciosAdministradores/tiendas.service';

@Component({
  selector: 'app-pagina-admin',
  templateUrl: './pagina-admin.component.html',
  styleUrls: ['./pagina-admin.component.css']
})
export class PaginaAdminComponent {
  constructor(private router: Router,
    private UsuariosService: UsuariosService,
    private cookieService: CookieService,
    private tiendasService: TiendasService
  ) { }


  selectedOption: string = 'optionTienda'; // Valor inicial

  datosBtn = [
    { texto: 'Agregar entidad producto', img: 'Añadir.svg', nombreClase: 'agregar', accion: this.agregarProducto.bind(this) },
    { texto: 'Modificar producto', img: 'ModificarProducto.svg', nombreClase: 'modificar', accion: this.modificarProducto.bind(this) },
    { texto: 'Eliminar producto', img: 'Eliminar.svg', nombreClase: 'eliminar', accion: this.eliminarProducto.bind(this) }
  ];

  agregarProducto() {
    console.log('Agregar nueva tienda');
    this.router.navigate(['/crearProducto']);
  }

  modificarProducto() {
    console.log('Modificar datos de tienda');
    this.router.navigate(['/modificarProducto']);
  }

  eliminarProducto() {
    console.log('Eliminar tienda');
    this.router.navigate(['/eliminarProducto']);
  }
}