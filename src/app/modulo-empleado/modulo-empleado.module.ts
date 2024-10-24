import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaEmpleadoComponent } from './pagina-empleado/pagina-empleado.component';
import { ModulosCompartidosModule } from '../modulosCompartidos/modulos-compartidos.module';



@NgModule({
  declarations: [
    PaginaEmpleadoComponent
  ],
  imports: [
    CommonModule,
    ModulosCompartidosModule
  ],
  exports: [
    PaginaEmpleadoComponent
  ]
})
export class ModuloEmpleadoModule { }
