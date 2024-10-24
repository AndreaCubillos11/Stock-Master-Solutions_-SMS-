import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'comp-tabla',
  templateUrl: './comp-tabla.component.html',
  styleUrls: ['./comp-tabla.component.css']
})

export class CompTablaComponent<T extends {}> implements OnInit {
  @Input() datos: T[] = [];//Array generico donde se guardan los datos
  nombresColumnas: string[] = [];//Array con los nombres e las columnas
  dataSource = new MatTableDataSource<T>();//Cambiar el any por la interfaz de la entidad a usar
  tieneDatos = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.updateTable(this.datos)
  }

  updateTable(data: T[]) {
    if (data.length > 0) {
      this.nombresColumnas = Object.keys(data[0]);
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

}
