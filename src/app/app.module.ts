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

@NgModule({
  declarations: [
    AppComponent,
    SectionLogoComponent,
    CompLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutenticacionModule,
    ModuloEmpleadoModule,
    ModuloAdminModule,
    BrowserAnimationsModule,
    ModulosCompartidosModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
