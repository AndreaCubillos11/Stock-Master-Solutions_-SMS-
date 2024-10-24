import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompFormLoginComponent } from './comp-form-login/comp-form-login.component';
import { ModulosCompartidosModule } from '../modulosCompartidos/modulos-compartidos.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CompFormLoginComponent
  ],
  imports: [
    CommonModule,
    ModulosCompartidosModule,
    ReactiveFormsModule
  ],
  exports:[
    CompFormLoginComponent
  ]
})
export class AutenticacionModule {

}
