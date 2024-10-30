import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaEmpleadoComponent } from './modulo-empleado/pagina-empleado/pagina-empleado.component';
import { CompLoginComponent } from './comp-login/comp-login.component';
import { PaginaAdminComponent } from './modulo-admin/pagina-admin/pagina-admin.component';
import { PaginaAlertasComponent } from './modulosCompartidos/pagina-alertas/pagina-alertas.component';
import { CrearUsuarioComponent } from './modulo-admin/crear-usuario/crear-usuario.component';
import { CrearProductoComponent } from './modulo-admin/crear-producto/crear-producto.component';
import { PaginaModificarProductoComponent } from './modulo-admin/pagina-modificar-producto/pagina-modificar-producto.component';
import { PaginaEliminarProductoComponent } from './modulo-admin/pagina-eliminar-producto/pagina-eliminar-producto.component';
import { PaginaModificarUsuarioComponent } from './modulo-admin/pagina-modificar-usuario/pagina-modificar-usuario.component';
import { CrearTiendaComponent } from './modulo-admin/crear-tienda/crear-tienda.component';
import { ModificarTiendaComponent } from './modulo-admin/modificar-tienda/modificar-tienda.component';

const routes: Routes = [
  {path: '', component: CompLoginComponent},
  {path: 'gestionProductos', component: PaginaEmpleadoComponent},
  {path: 'alertaInventario', component: PaginaAlertasComponent},
  {path: 'gestionAdminG', component: PaginaAdminComponent},
  {path: 'signup', component:CrearUsuarioComponent},
  {path: 'crearProducto', component:CrearProductoComponent},
  {path: 'modificarProducto', component: PaginaModificarProductoComponent},
  {path: 'eliminarProducto', component: PaginaEliminarProductoComponent},
  {path: 'modificarUsuario', component:PaginaModificarUsuarioComponent},
  {path: 'crearTienda', component:CrearTiendaComponent},
  {path: 'modificarTienda', component:ModificarTiendaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
