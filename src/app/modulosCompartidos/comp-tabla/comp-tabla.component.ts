import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'comp-tabla',
  templateUrl: './comp-tabla.component.html',
  styleUrls: ['./comp-tabla.component.css']
})

export class CompTablaComponent<T extends {}> implements OnInit {
  @Input() datos: T[] = []; // Array genérico donde se guardan los datos
  @Input() seleccionable: boolean = false; // Controla si las filas son seleccionables
  @Output() selectionChange = new EventEmitter<T | null>();
  nombresColumnas: string[] = []; // Array con los nombres de las columnas
  dataSource = new MatTableDataSource<T>();
  tieneDatos = false;
  selection = new SelectionModel<T>(false, []); // Modelo de selección

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.updateTable(this.datos);
  }

  updateTable(data: T[]) {
    if (data.length > 0) {
      this.nombresColumnas = this.seleccionable ? ['select', ...Object.keys(data[0])] : Object.keys(data[0]);
      this.dataSource.data = data;
      this.tieneDatos = true;
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtroBusqueda(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onRowClicked(row: T) {
    this.selection.clear();
    this.selection.toggle(row);
    this.emitSelectionChange();
  }

  emitSelectionChange() {
    this.selectionChange.emit(this.selection.hasValue() ? this.selection.selected[0] : null);
  }

}
