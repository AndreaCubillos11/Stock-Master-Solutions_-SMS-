import { Component } from '@angular/core';
import { Producto } from 'src/models/producto.model';
import { Router } from '@angular/router';
import { ProductosService } from '../serviciosAdministradores/productos.service';

@Component({
  selector: 'app-pagina-eliminar-producto',
  templateUrl: './pagina-eliminar-producto.component.html',
  styleUrls: ['./pagina-eliminar-producto.component.css']
})
export class PaginaEliminarProductoComponent {
  datosHeader = [
    { titulo: 'Eliminar Producto', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver', accion: this.volver.bind(this) },
  ];

  datos: Producto[] = [{
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
  }];

  constructor(private router: Router, private productosService: ProductosService) { }

  seleccionable = true;
  filaSeleccionada: Producto | null = null;

  volver() {
    this.router.navigate(['/gestionAdminG']);
  }

  onSelectionChange(fila: Producto | null) {
    this.filaSeleccionada = fila;
  }

  eliminar(){
    if (this.filaSeleccionada) {
      const codigoFila = this.filaSeleccionada.codigoBarras
      this.productosService.deleteProducto(codigoFila).subscribe({
        next:(res) => {
          if (res) {
            console.log('Producto eliminado');
          } else {
            console.log('No se elimino');
          }
        },
        error:(err) => {
          console.log('ocurrio un error', err);
        },
      });
    }
  }
  
}
