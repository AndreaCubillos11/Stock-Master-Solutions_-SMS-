import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { CompHeaderGestionComponent } from './comp-header-gestion/comp-header-gestion.component';
import { CompBtnCRUDComponent } from './comp-btn-crud/comp-btn-crud.component';
import { CompCardStockComponent } from './comp-card-stock/comp-card-stock.component';
import { CompBarraBusquedaComponent } from './comp-barra-busqueda/comp-barra-busqueda.component';
import { CompBtnCodigoBarrasComponent } from './comp-btn-codigo-barras/comp-btn-codigo-barras.component';
import { CompSelectoresComponent } from './comp-selectores/comp-selectores.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CompTablaComponent } from './comp-tabla/comp-tabla.component';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaginaAlertasComponent } from './pagina-alertas/pagina-alertas.component';
import { HeaderPrincipalComponent } from './comp-header-principal/header-principal.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { CompVentanaEmergenteComponent } from './comp-ventana-emergente/comp-ventana-emergente.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PaginaHistorialComponent } from './pagina-historial/pagina-historial.component';
import { PaginaReportesComponent } from './pagina-reportes/pagina-reportes.component';
import { FormsModule } from '@angular/forms';
import { ProductoNombrePipe } from '../pipes/producto-nombre.pipe';
import { CategoriaProductoPipe } from '../pipes/categoria-producto.pipe';



@NgModule({
  declarations: [
    CompHeaderGestionComponent,
    CompBtnCRUDComponent,
    CompCardStockComponent,
    CompBarraBusquedaComponent,
    CompBtnCodigoBarrasComponent,
    CompSelectoresComponent,
    CompTablaComponent,
    PaginaAlertasComponent,
    HeaderPrincipalComponent,
    CompVentanaEmergenteComponent,
    PaginaHistorialComponent,
    PaginaReportesComponent,
    ProductoNombrePipe,
    CategoriaProductoPipe
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatBadgeModule,
    NgFor,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    RouterModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [
    CompHeaderGestionComponent,
    CompBarraBusquedaComponent,
    CompBtnCRUDComponent,
    CompBtnCodigoBarrasComponent,
    CompCardStockComponent,
    CompSelectoresComponent,
    CompTablaComponent,
    HeaderPrincipalComponent,
    CompVentanaEmergenteComponent,
    PaginaHistorialComponent,
    ProductoNombrePipe,
    CategoriaProductoPipe
  ]
})
export class ModulosCompartidosModule { }
