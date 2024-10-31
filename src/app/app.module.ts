import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionLogoComponent } from './comp-section-logo/section-logo.component';
import { AutenticacionModule } from './moduloAutenticacion/autenticacion.module';
import { ModuloEmpleadoModule } from './modulo-empleado/modulo-empleado.module';
import { CompLoginComponent } from './comp-login/comp-login.component';
import { ModuloAdminModule } from './modulo-admin/modulo-admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModulosCompartidosModule } from "./modulosCompartidos/modulos-compartidos.module";
import { CookieService } from 'ngx-cookie-service';
import { CrearUsuarioComponent } from './modulo-admin/crear-usuario/crear-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PaginaModificarUsuarioComponent } from './modulo-admin/pagina-modificar-usuario/pagina-modificar-usuario.component';
import { CrearTiendaComponent } from './modulo-admin/crear-tienda/crear-tienda.component';
import { ModificarTiendaComponent } from './modulo-admin/modificar-tienda/modificar-tienda.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionLogoComponent,
    CompLoginComponent,
    CrearUsuarioComponent,
    PaginaModificarUsuarioComponent,
    CrearTiendaComponent,
    ModificarTiendaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutenticacionModule,
    ModuloEmpleadoModule,
    ModuloAdminModule,
    BrowserAnimationsModule,
    ModulosCompartidosModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }