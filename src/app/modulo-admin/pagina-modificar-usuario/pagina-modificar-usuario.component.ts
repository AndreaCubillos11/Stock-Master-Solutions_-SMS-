import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../serviciosAdministradores/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { TiendasService } from '../serviciosAdministradores/tiendas.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pagina-modificar-usuario',
  templateUrl: './pagina-modificar-usuario.component.html',
  styleUrls: ['./pagina-modificar-usuario.component.css']
})
export class PaginaModificarUsuarioComponent {
  datosHeader = [
    { titulo: 'Modificar Usuario', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];
  usuarioForm: any = this.formBuilder.group({
    usuarioId: 0,
    nombreUsuario: '',
    contraseña: '',
    nombreCompleto: '',
    rol: 0,
    correoElectronico: '',
    fechaCreacion: [new Date()],
    tiendaId: 0
  })

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  lisTienda: any = [];
  
  usuario: any;
  ngOnInit() {
    this.listaTienda(); // Llama al método para cargar las tiendas
    this.consultarUsuario();
  }

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private UsuariosService: UsuariosService,
    private toastr: ToastrService,
    private tiendasService: TiendasService,
    private cookieService:CookieService
  ) { }

  modificarUsuario(){
    this.UsuariosService.modificarUsuario(this.cookieService.get('Token'),this.usuarioForm.value).subscribe(
      () => {
        this.modalTitle = '';
        this.modalContent = 'El usuario ha sido guardado exitosamente';
        this.isModalOpen = true;
        setTimeout(() => {
          this.router.navigateByUrl('/gestionUsuarios');
        }, 2000); // 3000 milisegundos = 3 segundos
      },
      (error) => {
        this.modalTitle = '';
        this.modalContent = 'Hubo un problema al registrar el usuario. Intente de nuevo.';
        this.isModalOpen = true;
      }
    );
  }
  closeModal() {
    this.isModalOpen = false;
  }
  listaTienda() {
    this.tiendasService.getTienda(this.cookieService.get('Token')).subscribe(
      (data: {}) => { this.lisTienda = data }
    );
  }
  consultarUsuario() {
    this.UsuariosService.consultarUsuario(this.cookieService.get('Token'), localStorage.getItem('setUsuario')).subscribe(
      data => {
        this.usuario = data
       
      }
    )
  }
}
