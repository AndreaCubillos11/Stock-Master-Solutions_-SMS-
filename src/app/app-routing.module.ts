import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaEmpleadoComponent } from './modulo-empleado/pagina-empleado/pagina-empleado.component';
import { CompLoginComponent } from './comp-login/comp-login.component';
import { PaginaAdminComponent } from './modulo-admin/pagina-admin/pagina-admin.component';
import { PaginaAlertasComponent } from './modulosCompartidos/pagina-alertas/pagina-alertas.component';
import { CrearUsuarioComponent } from './modulo-admin/crear-usuario/crear-usuario.component';
import { CrearProductoComponent } from './modulo-admin/crear-producto/crear-producto.component';
import { PaginaModificarProductoComponent } from './modulo-admin/pagina-modificar-producto/pagina-modificar-producto.component';

const routes: Routes = [
  {path: '', component: CompLoginComponent},
  {path: 'gestionProductos', component: PaginaEmpleadoComponent},
  {path: 'alertaInventario', component: PaginaAlertasComponent},
  {path: 'gestionAdminG', component: PaginaAdminComponent},
  {path: 'signup', component:CrearUsuarioComponent},
  {path: 'crearProducto', component:CrearProductoComponent},
  {path: 'modificarProducto', component: PaginaModificarProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
