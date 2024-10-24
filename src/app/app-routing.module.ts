import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaEmpleadoComponent } from './modulo-empleado/pagina-empleado/pagina-empleado.component';
import { CompLoginComponent } from './comp-login/comp-login.component';
import { PaginaAdminComponent } from './modulo-admin/pagina-admin/pagina-admin.component';
import { PaginaAlertasComponent } from './modulosCompartidos/pagina-alertas/pagina-alertas.component';

const routes: Routes = [
  {path: '', component: CompLoginComponent},
  {path: 'gestionProductos', component: PaginaEmpleadoComponent},
  {path: 'alertaInventario', component: PaginaAlertasComponent},
  {path: 'gestionADMIN', component: PaginaAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
