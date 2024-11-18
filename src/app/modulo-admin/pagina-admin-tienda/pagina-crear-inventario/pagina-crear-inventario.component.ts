import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventario } from 'src/models/inventario.model';
import { InventariosService } from '../../serviciosAdministradores/inventarios.service';
import { CookieService } from 'ngx-cookie-service';
import { ProductosService } from '../../serviciosAdministradores/productos.service';
import { Producto } from 'src/models/producto.model';

@Component({
  selector: 'app-pagina-crear-inventario',
  templateUrl: './pagina-crear-inventario.component.html',
  styleUrls: ['./pagina-crear-inventario.component.css']
})
export class PaginaCrearInventarioComponent {

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  imagenSrc: string | ArrayBuffer | null = null;
  urlImagen!: string;
  formInventario: FormGroup;

  datosHeader = [
    { titulo: 'Crear inventario', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  inventarios = [
    { value: 1, label: 'Aseo' },
    { value: 2, label: 'Tecnologia' },
    { value: 3, label: 'Comida' },
    { value: 4, label: 'Ropa' },
  ]

  idTiendaUsuario: number = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);

  constructor(private form: FormBuilder, private inventariosService: InventariosService, private cookies: CookieService,
    private productosService: ProductosService
  ) {
    this.formInventario = this.form.group({
      idInventario: [null, [Validators.required, Validators.min(1)]],
      productoId: [null, [Validators.required, Validators.min(1)]],
      tiendaId:  [this.idTiendaUsuario],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      cantidadMinima: [null, [Validators.required, Validators.min(1)]],
      fechaUltimaActualizacion: [new Date()],
      cantidadBodega: [null, [Validators.required, Validators.min(1)]],
      ubicacionTienda: ['', [Validators.required, Validators.min(1)]]
    })
    /* this.formInventario.get('idInventario')?.valueChanges.subscribe(value => {
      const numericValue = parseInt(value, 10);
      this.formInventario.get('idInventario')?.setValue(numericValue, { emitEvent: false });
    }) */;
  }

  consultarProducto(): void {
    const idProducto = this.formInventario.get('productoId')?.value;
    if (idProducto) {
      this.formInventario.get('productoId')?.disable(); // Deshabilita el input
      this.traerProducto(idProducto).finally(() => {
        setTimeout(() => {
          this.formInventario.get('productoId')?.enable(); // Habilita el input después de 2 segundos
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
            this.urlImagen = data.urlImage;
          } else {
            console.warn('Producto no encontrado');
          }
          resolve();
        },
        error: (error) => {
          console.error('Error al obtener el producto:', error);
          resolve();
        }
      });
    });
  }

  agregar() {
    console.log(this.formInventario.value);
    if (this.formInventario.valid) {
      console.log(this.formInventario.get('tiendaId')?.value);
      const nuevoInventario: Inventario = { ...this.formInventario.value};
      this.inventariosService.agregarInventario(this.cookies.get('Token'), nuevoInventario).subscribe((resultado: boolean) => {
        if (resultado) {
          console.log('Inventario añadido exitosamente');
          this.openModal('Creado exitosamente',`El inventario se creo correctamente con ${nuevoInventario.productoId}`)
        } else {
          console.log('Error al añadir el inventario');
          this.openModal('Error al crear el inventario',`Ocurrio un error, Porfavor intenta de nuevo mas tarde`)
        }
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
