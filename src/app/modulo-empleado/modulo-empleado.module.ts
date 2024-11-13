import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaEmpleadoComponent } from './pagina-empleado/pagina-empleado.component';
import { ModulosCompartidosModule } from '../modulosCompartidos/modulos-compartidos.module';
import { PaginaDevolucionesComponent } from './pagina-devoluciones/pagina-devoluciones.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaginaEmpleadoComponent,
    PaginaDevolucionesComponent
  ],
  imports: [
    CommonModule,
    ModulosCompartidosModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginaEmpleadoComponent
  ]
})
export class ModuloEmpleadoModule { }
