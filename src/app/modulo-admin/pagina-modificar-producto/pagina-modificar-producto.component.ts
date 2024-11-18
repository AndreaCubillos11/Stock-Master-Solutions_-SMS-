import { Component, EventEmitter, OnInit, ChangeDetectorRef} from '@angular/core';
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
  urlImagen!: string;

  datosHeader = [
    { titulo: 'Modificar Producto', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

 
  datosProductos: Producto[] = [];

  datosTabla = [
    {
      datos: [] as Producto[],
      seleccionable: true,
      selectionChange: new EventEmitter<Producto | null>()
    }
  ];
 
  constructor(private servicio: CompartirFilaService, private productosService: ProductosService, private cookies: CookieService, private cd: ChangeDetectorRef) { }
 
  ngOnInit(): void {
    this.datosTabla[0].datos = this.datosProductos;
    this.cargarProductos()
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
        this.cd.detectChanges();
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
      this.productoIdSeleccionado = fila.productoId;
      this.servicio.selectProducto(fila);
    }
  }
 
  onModificarClick() {
    this.mostrarTemplate1 = false;
  }
}
