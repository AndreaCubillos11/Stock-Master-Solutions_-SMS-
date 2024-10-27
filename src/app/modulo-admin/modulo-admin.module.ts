import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaAdminComponent } from './pagina-admin/pagina-admin.component';
import { ModulosCompartidosModule } from '../modulosCompartidos/modulos-compartidos.module';
import { ProductosService } from './serviciosAdministradores/productos.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { PaginaModificarProductoComponent } from './pagina-modificar-producto/pagina-modificar-producto.component';



@NgModule({
  declarations: [
    PaginaAdminComponent,
    CrearProductoComponent,
    PaginaModificarProductoComponent
  ],
  imports: [
    CommonModule,
    ModulosCompartidosModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    PaginaAdminComponent,
    PaginaModificarProductoComponent
  ],
  providers:[
    ProductosService
  ]
})
export class ModuloAdminModule { }
