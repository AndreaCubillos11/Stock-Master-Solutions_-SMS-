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
  @Input() datos: T[] = [];
  @Input() seleccionable: boolean = false;
  @Output() selectionChange = new EventEmitter<T | null>();


  columnasBase: string[] = [];
  nombresColumnas: string[] = [];
  dataSource = new MatTableDataSource<T>();
  tieneDatos = false;
  selection = new SelectionModel<T>(false, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.updateTable(this.datos);
  }

  updateTable(data: T[]) {
    if (data.length > 0) {
      this.columnasBase = Object.keys(data[0]);
      // Definir nombresColumnas dependiendo de si seleccionable es true
      this.nombresColumnas = this.seleccionable ? ['select', ...this.columnasBase] : this.columnasBase;
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

  onRowSelection(row: T) {
    const isSelected = this.selection.isSelected(row);
    this.selection.clear();
    if (!isSelected) {
        this.selection.toggle(row);
    }
    const selectedRow = this.selection.selected.length > 0 ? this.selection.selected[0] : null;
    this.selectionChange.emit(selectedRow);
  }

}
