import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../serviciosAdministradores/usuarios.service';
import { TiendasService } from '../serviciosAdministradores/tiendas.service';
import { ToastrService } from 'ngx-toastr';
import { Tienda } from 'src/models/tienda.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private gestionarUsuariosService: UsuariosService,
    private toastr: ToastrService,
    private tiendasService: TiendasService,
    private cookieService:CookieService
  ) { }

  ngOnInit() {
    this.listaTienda(); // Llama al método para cargar las tiendas
    
  }

  nuevoUsuario() {
    
    console.log(this.usuarioForm.value)
    this.gestionarUsuariosService.nuevoUsuario(this.cookieService.get('Token'), this.usuarioForm.value).subscribe(
      () => {
        this.modalTitle = '';
        this.modalContent = 'El usuario ha sido guardado exitosamente';
        this.isModalOpen = true;
        
        // Espera de 3 segundos antes de redirigir
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
      (data: {}) => { this.lisTienda = data 
        
      }
    );
  }
}
