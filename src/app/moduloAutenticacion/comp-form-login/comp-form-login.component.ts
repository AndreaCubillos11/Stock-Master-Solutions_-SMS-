import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InicioCierreSesionService } from '../serviciosAutenticacion/inicio-cierre-sesion.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from 'src/app/modulo-admin/serviciosAdministradores/usuarios.service';

@Component({
  selector: 'comp-form-login',
  templateUrl: './comp-form-login.component.html',
  styleUrls: ['./comp-form-login.component.css']
})

export class CompFormLoginComponent {

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  isRestauracionContraseVisible = false;
  isValidarCodigoVisible = false;
  isCodigoVisible = false;
  isNuevaContraseVisible = false;
  usuario:any;


  values: string[] = ['Valor1', 'Valor2', 'Valor3', 'Valor4', 'Valor5'];
  valueExists: boolean | null = null; // Variable para el resultado de la verificación
  inputValue: string = ''; // Variable para el valor ingresado
  inputContrase1: string = '';
  inputContrase2: string = '';

  // Variable para almacenar el valor seleccionado
  selectedValue: string | null = null;

  openModal(title: string, content: string) {
    this.modalTitle = title;
    this.modalContent = content;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  //Hacer el manejo de inicio de sesion y recuperación de la contraseña
  formularioLogin: FormGroup;

  constructor(private router: Router, private form: FormBuilder, 
    private _servicio: InicioCierreSesionService, 
    private UsuariosService:UsuariosService,
    private cookieService: CookieService 
  ) {
    this.formularioLogin = this.form.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    })
  }

  iniciarSesion() {
    if (this.formularioLogin.valid) {
      this._servicio.login(this.formularioLogin.value).subscribe({
        next: () => {
          const rol = this._servicio.getRol();
          if (rol === 1) {
            this.router.navigate(['/gestionAdminG']);
          } else if (rol === 2) {
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['/gestionProductos']);
          }
          this.formularioLogin.reset();
        },
        error: err => {
          this.openModal('Error de Inicio de Sesión', `${err.message}`);
          console.error('Error de autenticación', err);
        }
      });
    }
  }
  restaurarCon() {
    this.isRestauracionContraseVisible = true
  }
  closeModalRestaurar() {
    this.isRestauracionContraseVisible = false;
  }
  closeModalx() {
    this.isCodigoVisible = false;
  }

  closeModalX() {
    this.isValidarCodigoVisible = false;
  }

  closeModalA() {
    this.isNuevaContraseVisible = false;
  }
  validarCodigo() {


    // Función para seleccionar un valor aleatorio de la lista

    const randomIndex = Math.floor(Math.random() * this.values.length);
    this.selectedValue = this.values[randomIndex];
    this.isCodigoVisible = true

  }
  // Función para verificar si el valor ingresado existe en la lista
  checkValueExists(): void {
    this.valueExists = this.values.includes(this.inputValue);
    if (this.valueExists == true) {
      this.isNuevaContraseVisible = true
    }
  }

  actualizarContraseña() {
    if (this.inputContrase1==this.inputContrase2) {
      
    }
  }

 /* consultarUsuario() {
    this.UsuariosService.consultarUsuario(this.cookieService.get('Token'), this.id).subscribe(
      data => {
        this.usuario = data
      }
    )
  }
   iniciarSesion() {
    if (this.formularioLogin.valid) {
      alert('Inicio de sesion exitoso');
      this.router.navigate(['/gestionProductos']);
      this.formularioLogin.reset();
    } else {
      
    }
  } */

}
