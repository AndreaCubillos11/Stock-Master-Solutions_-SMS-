import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuarios.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from '../serviciosAdministradores/usuarios.service';

@Component({
  selector: 'app-pagina-gestion-usuarios',
  templateUrl: './pagina-gestion-usuarios.component.html',
  styleUrls: ['./pagina-gestion-usuarios.component.css']
})
export class PaginaGestionUsuariosComponent implements OnInit{
  datosHeader = [
    { titulo: 'Gestionar usuarios', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  datosBtn = [
    { texto: 'Agregar nuevo usuario', img: 'Añadir.svg', nombreClase: 'agregar', accion: this.agregarUsuario.bind(this) },
    { texto: 'Modificar datos de usuario', img: 'personEdit.svg', nombreClase: 'modificar', accion: this.modificarUsuario.bind(this) },
    { texto: 'Eliminar usuario', img: 'Eliminar.svg', nombreClase: 'eliminar', accion: this.eliminarUsuario.bind(this) }
  ];

  datosTabla = [
    {
      datos: [] as Usuario[],
      seleccionable: false,
    }
  ];

  usuarios: Usuario[] = [];
  id= 0;
  usuario: any;
  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  isEliminarUsuarioVisible: boolean = false;
  isConsultarUsuarioVisible: boolean = false;
  isConfirmacionUsuarioVisible: boolean = false;

  constructor(private router: Router,
    private UsuariosService: UsuariosService,
    private cookieService: CookieService, 
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios()
  }

  cargarUsuarios(): void {
    this.UsuariosService.getAllUsuarios(this.cookieService.get('Token')).subscribe({
      next: (data: Usuario[]) => {
        console.log(data);
        this.datosTabla[0].datos = data;
        this.datosTabla = [{
          ...this.datosTabla[0],
          datos: [...data]
        }]
        console.log(this.datosTabla[0].datos)
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    });
  }

  agregarUsuario() {
    this.router.navigate(['/signup']);
  }

  modificarUsuario() {
    this.isConsultarUsuarioVisible = true
  }


  consultarUsuario() {
    this.UsuariosService.consultarUsuario(this.cookieService.get('Token'), this.id).subscribe(
      data => {
        this.usuario = data
      }
    )
  }
  closeModalConsultar() {
    this.isConsultarUsuarioVisible = false;
  }
  closeModalConfirmar() {
    this.isConfirmacionUsuarioVisible = false;
  }
  actualizarUsuario() {

    this.router.navigate(['/modificarUsuario']);
  }
  usuarioEliminar(idEliminar?: any) {
    this.UsuariosService.eliminarUsuario(this.cookieService.get('Token'), idEliminar).subscribe(
      () => {
        this.modalTitle = '';
        this.modalContent = '¡El usuario ha sido eliminado exitosamente';
        this.isModalOpen = true;

        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2000 milisegundos = 2 segundos // 3000 milisegundos = 3 segundos
      },
      (error) => {
        this.modalTitle = '';
        this.modalContent = 'Hubo un problema al eliminar el usuario. Intente de nuevo.';
        this.isModalOpen = true;
      }
    );
  }

  eliminarUsuario() {
    this.isEliminarUsuarioVisible = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  closeModalEliminar() {
    this.isEliminarUsuarioVisible = false;
  }

  confirmacion() {
    this.isConfirmacionUsuarioVisible = true
    this.isEliminarUsuarioVisible = false
  }
}



