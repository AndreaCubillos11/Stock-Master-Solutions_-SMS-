import { Component } from '@angular/core';
import { Usuario } from 'src/models/usuarios.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-gestion-usuarios',
  templateUrl: './pagina-gestion-usuarios.component.html',
  styleUrls: ['./pagina-gestion-usuarios.component.css']
})
export class PaginaGestionUsuariosComponent {
  datosHeader = [
    { titulo: 'Gestionar usuarios', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  usuarios:Usuario[] =[];

  constructor(private router: Router){

  }

  datosBtn = [
    { texto: 'Agregar nuevo usuario', img: 'Añadir.svg', nombreClase: 'agregar', accion: this.agregarUsuario.bind(this) },
    { texto: 'Modificar datos de usuario', img: 'personEdit.svg', nombreClase: 'modificar', accion: this.modificarUsuario.bind(this) },
    { texto: 'Eliminar usuario', img: 'Eliminar.svg', nombreClase: 'eliminar', accion: this.eliminarUsuario.bind(this) }
  ];

  agregarUsuario() {
    console.log('Agregar usuario');
    this.router.navigate(['/crearUsuario']);
  }

  modificarUsuario() {
    console.log('Modificar usuario');
    this.router.navigate(['/modificarUsuario']);
  }

  eliminarUsuario() {
    console.log('Eliminar usuario');
    //this.router.navigate(['/eliminarUsuario']);
  }
}
