import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaAdminComponent } from './pagina-admin/pagina-admin.component';
import { ModulosCompartidosModule } from '../modulosCompartidos/modulos-compartidos.module';
import { ProductosService } from './serviciosAdministradores/productos.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { PaginaModificarProductoComponent } from './pagina-modificar-producto/pagina-modificar-producto.component';
import { FormModfiicarComponent } from './pagina-modificar-producto/form-modfiicar/form-modfiicar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PaginaEliminarProductoComponent } from './pagina-eliminar-producto/pagina-eliminar-producto.component';
import { PaginaGestionUsuariosComponent } from './pagina-gestion-usuarios/pagina-gestion-usuarios.component';



@NgModule({
  declarations: [
    PaginaAdminComponent,
    CrearProductoComponent,
    PaginaModificarProductoComponent,
    FormModfiicarComponent,
    PaginaEliminarProductoComponent,
    PaginaGestionUsuariosComponent
  ],
  imports: [
    CommonModule,
    ModulosCompartidosModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
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
