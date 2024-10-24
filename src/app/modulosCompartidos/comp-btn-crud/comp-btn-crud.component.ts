import { Component } from '@angular/core';

@Component({
  selector: 'comp-btn-crud',
  templateUrl: './comp-btn-crud.component.html',
  styleUrls: ['./comp-btn-crud.component.css']
})
export class CompBtnCRUDComponent {
  btnAgregar: string = 'Agregar producto nuevo';
  btnModificar: string = 'Modificar datos de producto';
  btnModificarStock: string = 'Modificar stock de producto';
  btnEliminar: string = 'Eliminar producto';
}
