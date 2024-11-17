import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductosService } from 'src/app/modulo-admin/serviciosAdministradores/productos.service';
import { ServicioDevolucionesService } from 'src/app/serviciosGenerales/servicio-devoluciones.service';
import { Devolucion } from 'src/models/devolucion.model';
import { Producto } from 'src/models/producto.model';

@Component({
  selector: 'app-pagina-devoluciones',
  templateUrl: './pagina-devoluciones.component.html',
  styleUrls: ['./pagina-devoluciones.component.css']
})
export class PaginaDevolucionesComponent implements OnInit {


  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  productName: string = ''; // Este es el nombre que se renderiza en el h2
  //estados = ['Nuevo', 'Ligeramente nuevo', 'Usado', 'Defectuoso'];
  estados = [
    { value: 'Nuevo', label: 'NEW' },
    { value: 'Ligeramente nuevo', label: 'A BIT USED' },
    { value: 'Usado', label: 'USED' },
    { value: 'Defectuoso', label: 'BAD' },
  ]

  idProducto!:number;
  idTiendaUsuario: number = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);
  idUsuario: number = parseInt(localStorage.getItem('IdUsuario') ?? '0', 10);

  datosHeader = [
    { titulo: 'Agregar Devolucion', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  formDevolucion: FormGroup;

  constructor(private form: FormBuilder, private cookies: CookieService, private devolucionService: ServicioDevolucionesService,
    private productosService: ProductosService
  ) {
    this.formDevolucion = this.form.group({
      /* DevolucionID: [, [Validators.required, Validators.min(1)]], */
      ProductoID: [null, [Validators.required, Validators.min(1)]],
      TiendaID: [this.idTiendaUsuario, [Validators.required, Validators.min(1)]],
      UsuarioID: [this.idUsuario, [Validators.required, Validators.min(1)]],
      razon: ['', [Validators.required, Validators.min(1)]],
      fechaUltimaActualizacion: [new Date()],
    })
    this.formDevolucion.get('ProductoID')?.valueChanges.subscribe((idProducto: number) => {
      this.idProducto = idProducto;
    });
  }

  ngOnInit(): void {}

  consultarProducto(): void {
    const idProducto = this.formDevolucion.get('ProductoID')?.value;
    if (idProducto) {
      this.formDevolucion.get('ProductoID')?.disable(); // Deshabilita el input
      this.traerProducto(idProducto).finally(() => {
        setTimeout(() => {
          this.formDevolucion.get('ProductoID')?.enable(); // Habilita el input después de 2 segundos
        }, 2000);
      });
    }
  }

  traerProducto(idProducto: number): Promise<void> {
    return new Promise((resolve) => {
      this.productosService.getProducto(this.cookies.get('Token'), idProducto).subscribe({
        next: (data: Producto | null) => {
          if (data) {
            console.log('Producto encontrado:', data);
            this.productName = data.nombreProducto; // Guarda el nombre del producto
          } else {
            console.warn('Producto no encontrado');
            this.productName = 'No encontrado'; // Manejo explícito si data es null
          }
          resolve();
        },
        error: (error) => {
          console.error('Error al obtener el producto:', error);
          this.productName = 'No encontrado'; // Manejo de errores en la petición
          resolve();
        }
      });
    });
  }

  agregarDevolucion() {
    console.log(this.formDevolucion.value);
    if (this.formDevolucion.valid) {
      console.log('valido');
      const devolucion: Devolucion = { ...this.formDevolucion.value };
      this.devolucionService.agregarDevolucion(this.cookies.get('Token'), devolucion).subscribe((resultado: boolean) => {
        if (resultado) {
          console.log('Producto devuelto');
          this.openModal('Producto devuelto', `Se realizó la correcta devolución del producto ${devolucion.ProductoID}`);
        } else {
          console.log('Error');
          this.openModal('Error', `Por favor intente de nuevo y no realice la devolución del dinero hasta que se confirme la devolución en el sistema.`);
        }
      });
    } else {
      this.openModal('Error', 'Por favor complete todos los campos correctamente.');
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
