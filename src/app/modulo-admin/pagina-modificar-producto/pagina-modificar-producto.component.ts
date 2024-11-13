import { Component, EventEmitter, OnInit } from '@angular/core';
import { Producto } from 'src/models/producto.model';
import { CompartirFilaService } from 'src/app/serviciosGenerales/compartir-fila.service';
import { ProductosService } from '../serviciosAdministradores/productos.service';
import { CookieService } from 'ngx-cookie-service';
 
@Component({
  selector: 'app-pagina-modificar-producto',
  templateUrl: './pagina-modificar-producto.component.html',
  styleUrls: ['./pagina-modificar-producto.component.css']
})
export class PaginaModificarProductoComponent implements OnInit {

  seleccionable = true;
  filaSeleccionada: Producto | null = null;
  mostrarTemplate1 = true;
  productoIdSeleccionado: number | null = null;

  datosHeader = [
    { titulo: 'Modificar Producto', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

 
  datosProductos: Producto[] = [/* {
    id: 1,
    codigoBarras: 1234567890123,
    nombreProducto: "Laptop",
    descripcion: "Laptop de 15 pulgadas con 8GB de RAM y 256GB SSD",
    precio: 1200.00,
    categoria: "Electrónica",
    fechaIngreso: new Date('2024-01-15')
  },
  {
    id: 2,
    codigoBarras: 2345678901234,
    nombreProducto: "Smartphone",
    descripcion: "Smartphone con pantalla de 6.5 pulgadas y 128GB de almacenamiento",
    precio: 800.00,
    categoria: "Electrónica",
    fechaIngreso: new Date('2024-02-10')
  },
  {
    id: 3,
    codigoBarras: 3456789012345,
    nombreProducto: "Cafetera",
    descripcion: "Cafetera de goteo con capacidad de 12 tazas",
    precio: 50.00,
    categoria: "Hogar",
    fechaIngreso: new Date('2024-03-05')
  } */];

  datosTabla = [
    {
      datos: this.datosProductos,
      seleccionable: true,
      selectionChange: new EventEmitter<Producto | null>()
    }
  ];
 
  constructor(private servicio: CompartirFilaService, private productosService: ProductosService, private cookies: CookieService) { }
 
  ngOnInit(): void {
    this.cargarProductos()
    //this.datosTabla[0].datos = this.datos;
    this.datosTabla[0].selectionChange.subscribe((fila: Producto | null) => this.onSelectionChange(fila))   
  }

  cargarProductos(): void {
    this.productosService.getAllProductos(this.cookies.get('Token')).subscribe({
      next: (data: Producto[]) => {
        console.log(data);
        this.datosProductos = data;
        this.datosTabla[0].datos = data;
        this.datosTabla = [{
          ...this.datosTabla[0],
          datos: [...data]
        }]
        console.log(this.datosTabla[0].datos)
      },
      error: (error) => {
        console.error('Error al obtener los productos', error);
      }
    });
  }
 
  onSelectionChange(fila: Producto | null) {
    this.filaSeleccionada = fila;
    if (fila) {
      this.productoIdSeleccionado = fila.id;
      this.servicio.selectProducto(fila);
    }
  }
 
  onModificarClick() {
    this.mostrarTemplate1 = false;
  }
}
