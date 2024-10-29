import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InicioCierreSesionService } from '../serviciosAutenticacion/inicio-cierre-sesion.service';

@Component({
  selector: 'comp-form-login',
  templateUrl: './comp-form-login.component.html',
  styleUrls: ['./comp-form-login.component.css']
})

export class CompFormLoginComponent {

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

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

  constructor(private router: Router, private form: FormBuilder, private _servicio: InicioCierreSesionService) {
    this.formularioLogin = this.form.group({
      user: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
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

  /* iniciarSesion() {
    if (this.formularioLogin.valid) {
      alert('Inicio de sesion exitoso');
      this.router.navigate(['/gestionProductos']);
      this.formularioLogin.reset();
    } else {
      
    }
  } */

}
