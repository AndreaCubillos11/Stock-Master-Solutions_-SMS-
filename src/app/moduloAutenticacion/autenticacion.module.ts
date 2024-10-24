import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompFormLoginComponent } from './comp-form-login/comp-form-login.component';
import { ModulosCompartidosModule } from '../modulosCompartidos/modulos-compartidos.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InicioCierreSesionService } from './serviciosAutenticacion/inicio-cierre-sesion.service';
import { HttpClientModule } from '@angular/common/http'



@NgModule({
  declarations: [
    CompFormLoginComponent
  ],
  imports: [
    CommonModule,
    ModulosCompartidosModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    CompFormLoginComponent
  ],
  providers:[
    InicioCierreSesionService
  ]
})
export class AutenticacionModule {

}
