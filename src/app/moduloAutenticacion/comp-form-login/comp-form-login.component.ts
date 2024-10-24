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

  constructor(private router: Router, private form: FormBuilder, private servicio: InicioCierreSesionService) {
    this.formularioLogin = this.form.group({
      user: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    })
  }

  iniciarSesion() {
    if (this.formularioLogin.valid) {
      this.servicio.login(this.formularioLogin.value).subscribe({
        next: (user) => {
          const role = this.servicio.getRol();
          if (role === 1) {
            this.router.navigate(['/gestionADMIN']);
          } else if (role === 2) {
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['/gestionProductos']);
          }
          this.formularioLogin.reset();
        },
        error: err => {
          this.openModal('Error de Inicio de Sesión', 'Por favor, verifica tus credenciales e intenta nuevamente.');
          console.error('Error de autenticación', err);
        }
      });
    }
  }

  /* ainiciarSesion() {
    if (this.formularioLogin.valid) {
      alert('Inicio de sesion exitoso');
      this.router.navigate(['/gestionProductos']);
      this.formularioLogin.reset();
    } else {
      
    }
  } */

}
