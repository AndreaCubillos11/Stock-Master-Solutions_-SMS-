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
    HeaderPrincipalComponent
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
    MatExpansionModule
  ],
  exports: [
    CompHeaderGestionComponent,
    CompBarraBusquedaComponent,
    CompBtnCRUDComponent,
    CompBtnCodigoBarrasComponent,
    CompCardStockComponent,
    CompSelectoresComponent,
    CompTablaComponent,
    HeaderPrincipalComponent
  ]
})
export class ModulosCompartidosModule { }
