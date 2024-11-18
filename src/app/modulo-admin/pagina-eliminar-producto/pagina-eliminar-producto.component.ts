import { Component, EventEmitter , OnInit} from '@angular/core';
import { Producto } from 'src/models/producto.model';
import { Router } from '@angular/router';
import { ProductosService } from '../serviciosAdministradores/productos.service';
import { CookieService } from 'ngx-cookie-service';
 
@Component({
  selector: 'app-pagina-eliminar-producto',
  templateUrl: './pagina-eliminar-producto.component.html',
  styleUrls: ['./pagina-eliminar-producto.component.css']
})
export class PaginaEliminarProductoComponent implements OnInit{

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  datosHeader = [
    { titulo: 'Eliminar Producto', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver'},
  ];

  datosTabla = [
    {
      datos: [] as Producto[],
      seleccionable: true,
      selectionChange: new EventEmitter<Producto | null>()
    }
  ];

  urlImagen!: string;
 
 /*  datos: Producto[] = [{
    id: 1,
    codigoBarras: 2566526885269,
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
  }]; */
 
  constructor(private router: Router, private productosService: ProductosService, private cookies: CookieService) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.datosTabla[0].selectionChange.subscribe((fila: Producto | null) => this.onSelectionChange(fila)) 
  }
 
  seleccionable = true;
  filaSeleccionada: Producto | null = null;

  cargarProductos(): void {
    this.productosService.getAllProductos(this.cookies.get('Token')).subscribe({
      next: (data: Producto[]) => {
        console.log(data);
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
      this.urlImagen = fila.urlImage;
    }
  }
 
  eliminar(){
    if (this.filaSeleccionada) {
      const codigoFila = this.filaSeleccionada.codigoBarras
      this.productosService.deleteProducto(codigoFila, this.cookies.get('Token')).subscribe({
        next:(res) => {
          if (res) {
            console.log('Producto eliminado');
            this.openModal('Eliminacion completada', `Se elimino el producto ${this.filaSeleccionada?.nombreProducto} de la base de datos`)
          } else {
            console.log(res)
            this.openModal('Eliminacion incompleta', `No se logro eliminar el producto "${this.filaSeleccionada?.nombreProducto}" n\
              Intentalo de nuevo mas tarde`)
          }
        },
        error:(err) => {
          this.openModal('Error de eliminacion',err)
          console.log('ocurrio un error', err);
        },
      });
    }
  }

  openModal(title: string, content: string) {
    this.modalTitle = title;
    this.modalContent = content;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
 
}