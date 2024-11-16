import { Component, NgModule } from '@angular/core';
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
import { PaginaGestionUsuariosComponent } from './modulo-admin/pagina-gestion-usuarios/pagina-gestion-usuarios.component';
import { PaginaHistorialComponent } from './modulosCompartidos/pagina-historial/pagina-historial.component';
import { PaginaAdminTiendaComponent } from './modulo-admin/pagina-admin-tienda/pagina-admin-tienda.component';
import { PaginaCrearInventarioComponent } from './modulo-admin/pagina-admin-tienda/pagina-crear-inventario/pagina-crear-inventario.component';
import { PaginaDevolucionesComponent } from './modulo-empleado/pagina-devoluciones/pagina-devoluciones.component';
import { SimularVentaComponent } from './modulo-empleado/simular-venta/simular-venta.component';
import { PaginaReportesComponent } from './modulosCompartidos/pagina-reportes/pagina-reportes.component';
import { ModificarCantidadComponent } from './modulo-admin/pagina-admin-tienda/modificar-cantidad/modificar-cantidad.component';
import { ModificarDatosComponent } from './modulo-admin/pagina-admin-tienda/modificar-datos/modificar-datos.component';

const routes: Routes = [
  {path: '', component: CompLoginComponent},
  {path: 'gestionEmpleado', component: PaginaEmpleadoComponent},
  {path: 'alertaInventario', component: PaginaAlertasComponent},
  {path: 'historialProductos', component: PaginaHistorialComponent},
  {path: 'reportes', component: PaginaReportesComponent},
  {path: 'gestionAdminG', component: PaginaAdminComponent},
  {path: 'gestionAdminT', component: PaginaAdminTiendaComponent},
  {path: 'signup', component:CrearUsuarioComponent},
  {path: 'devoluciones', component: PaginaDevolucionesComponent},
  {path: 'gestionUsuarios', component:PaginaGestionUsuariosComponent},
  {path: 'crearProducto', component:CrearProductoComponent},
  {path: 'modificarProducto', component: PaginaModificarProductoComponent},
  {path: 'eliminarProducto', component: PaginaEliminarProductoComponent},
  {path: 'modificarUsuario', component:PaginaModificarUsuarioComponent},
  {path: 'crearTienda', component:CrearTiendaComponent},
  {path: 'modificarTienda', component:ModificarTiendaComponent},
  {path: 'crearInventario', component: PaginaCrearInventarioComponent},
  {path: 'simularVenta', component:SimularVentaComponent},
  {path: 'modificarCantidad', component:ModificarCantidadComponent},
  {path: 'modificarDatos', component:ModificarDatosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
