import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'comp-form-login',
  templateUrl: './comp-form-login.component.html',
  styleUrls: ['./comp-form-login.component.css']
})

export class CompFormLoginComponent {
  //Hacer el manejo de inicio de sesion y recuperación de la contraseña
  formularioLogin: FormGroup;

  constructor(private router: Router, private form: FormBuilder) {
    this.formularioLogin = this.form.group({
      email:['',[Validators.required, Validators.email]],
      contraseña: ['',Validators.required]
    })
  }

  iniciarSesion() {
    this.router.navigate(['/gestionProductos']);
  }
}
