import { Component, OnInit, ViewChild, Input, EventEmitter, OnDestroy, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'comp-tabla',
  templateUrl: './comp-tabla.component.html',
  styleUrls: ['./comp-tabla.component.css']
})

export class CompTablaComponent<T extends {}> implements OnInit, OnDestroy {
  @Input() datos: {
    datos: T[],
    seleccionable: boolean,
    selectionChange?: EventEmitter<T | null>
  }[] = [
      {
        datos: [],
        seleccionable: false,
        selectionChange: new EventEmitter<T | null>()
      }
    ]


  columnasBase: string[] = [];
  nombresColumnas: string[] = [];
  dataSource = new MatTableDataSource<T>();
  tieneDatos = false;
  selection = new SelectionModel<T>(false, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    console.log(this.datos[0]);
    this.updateTable(this.datos[0].datos);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos'] && changes['datos'].currentValue) {
      const nuevoDatos = changes['datos'].currentValue;
      this.updateTable(nuevoDatos[0].datos); // Asegura que se pase el arreglo de datos
    }
  }

  ngOnDestroy(): void {
    console.log('destruido ;))');
    this.datos.forEach(d => d.selectionChange?.unsubscribe());
    this.datos = [];
    this.dataSource.data = [];
  }

  updateTable(data: T[]) {
    if (data && data.length > 0) {
      this.columnasBase = Object.keys(data[0]);
      this.nombresColumnas = this.datos[0].seleccionable
        ? ['select', ...this.columnasBase]
        : this.columnasBase;
 
      this.dataSource.data = data;
      this.tieneDatos = true;
    } else {
      this.columnasBase = [];
      this.nombresColumnas = [];
      this.dataSource.data = [];
      this.tieneDatos = false;
    }
 
    // Asignar paginador y ordenación
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRowSelection(row: T) {
    const isSelected = this.selection.isSelected(row);
    this.selection.clear();
    if (!isSelected) {
      this.selection.toggle(row);
    }
    const selectedRow = this.selection.selected.length > 0 ? this.selection.selected[0] : null;
    this.datos[0].selectionChange?.emit(selectedRow);
  }

  filtroBusqueda(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
