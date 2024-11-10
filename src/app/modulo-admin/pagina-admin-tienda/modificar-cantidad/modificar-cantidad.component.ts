import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../serviciosAdministradores/productos.service';
import { CookieService } from 'ngx-cookie-service';
import { TiendasService } from '../../serviciosAdministradores/tiendas.service';
import { InventariosService } from '../../serviciosAdministradores/inventarios.service';

@Component({
  selector: 'app-modificar-cantidad',
  templateUrl: './modificar-cantidad.component.html',
  styleUrls: ['./modificar-cantidad.component.css']
})
export class ModificarCantidadComponent {

  inventarioForm: any = this.formBuilder.group({
    idInventario: 0,
    productoId: 0,
    tiendaId: 0,
    cantidad: 0,
    cantidadMinima: 0,
    cantidadBodega: 0,
    ubicacionTienda: '',
    fechaUltimaActualizacon: [new Date()]
  });

  codigoBarras: any;
  producto: any;
  agregarCantidad: boolean = false;
  eliminarCantidad: boolean = false;
  tiendaSeleccionada: boolean = false;
  bodegaSeleccionada: boolean = false;
  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  cantidad: any = 0;
  inventario: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productos: ProductosService,
    private cookieService: CookieService,
    private tiendasService: TiendasService,
    private inventariosService: InventariosService
  ) { }

  consultarProduct() {
    this.productos.consultarProducto(this.cookieService.get('Token'), this.codigoBarras).subscribe(
      data => {
        if (data) {
          this.producto = data;
        }
      },
      error => {
        console.error("Error al consultar el producto:", error);
      }
    );
  }
  modificarInventario() {
    this.inventarioForm.get('tiendaId')?.setValue(localStorage.getItem('IdTienda'));
    this.inventarioForm.get('productoId')?.setValue(this.producto.productoId);
    this.inventarioForm.get('cantidadMinima')?.setValue(this.inventario.cantidadMinima);
    this.inventarioForm.get('ubicacionTienda')?.setValue(this.inventario.ubicacionTienda);

    if (this.tiendaSeleccionada == true) {
      this.inventarioForm.get('cantidad')?.setValue(this.inventario.cantidad + this.cantidad)
      this.inventarioForm.get('cantidadBodega')?.setValue(this.inventario.cantidadBodega)
    } else {
      this.inventarioForm.get('cantidadBodega')?.setValue(this.inventario.cantidadBodega + this.cantidad)
    }
    this.inventariosService.actualizarInventario(this.cookieService.get('Token'), this.inventarioForm.value).subscribe(
      () => {
        this.modalTitle = '';
        this.modalContent = 'La cantidad del inventario ha sido modificada exitosamente';
        this.isModalOpen = true;

        // Espera de 3 segundos antes de redirigir
        setTimeout(() => {
          this.router.navigateByUrl('/modificarCantidad');
        }, 2000); // 3000 milisegundos = 3 segundos
      },
      (error) => {
        this.modalTitle = '';
        this.modalContent = 'Hubo un problema al hacer la modificación. Intente de nuevo.';
        this.isModalOpen = true;
      }
    );
  }
  onAgregarChange(event: Event) {
    this.consultarInventario();
    const inputElement = event.target as HTMLInputElement;
    this.agregarCantidad = inputElement.checked;
    if (this.agregarCantidad) {
      this.eliminarCantidad = false; // Desactivar "Eliminar" si "Agregar" está seleccionado
    }
  }

  onEliminarChange(event: Event) {
    this.consultarInventario();
    const inputElement = event.target as HTMLInputElement;
    this.eliminarCantidad = inputElement.checked;
    if (this.eliminarCantidad) {
      this.agregarCantidad = false; // Desactivar "Agregar" si "Eliminar" está seleccionado
    }
  }

  onTiendaChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.tiendaSeleccionada = inputElement.checked;
    if (this.tiendaSeleccionada) {
      this.bodegaSeleccionada = false; // Desactivar "Bodega" si "Tienda" está seleccionada
    }
  }

  onBodegaChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.bodegaSeleccionada = inputElement.checked;
    if (this.bodegaSeleccionada) {
      this.tiendaSeleccionada = false; // Desactivar "Tienda" si "Bodega" está seleccionada
    }
  }

  consultarInventario() {
    this.inventariosService.consultarInventario(this.cookieService.get('Token'), this.producto.productoId).subscribe(
      data => {
        if (data) {
          this.inventario = data;
        }
      },
      error => {
        console.error("Error al consultar el producto:", error);
      }
    );
  }
  eliminarCantidadInventario() {
    this.inventarioForm.get('tiendaId')?.setValue(localStorage.getItem('IdTienda'));
    this.inventarioForm.get('productoId')?.setValue(this.producto.productoId);
    this.inventarioForm.get('cantidadMinima')?.setValue(this.inventario.cantidadMinima);
    this.inventarioForm.get('ubicacionTienda')?.setValue(this.inventario.ubicacionTienda);

    if (this.tiendaSeleccionada == true) {
      this.inventarioForm.get('cantidad')?.setValue(this.inventario.cantidad - this.cantidad)
      this.inventarioForm.get('cantidadBodega')?.setValue(this.inventario.cantidadBodega)
    } else {
      this.inventarioForm.get('cantidadBodega')?.setValue(this.inventario.cantidadBodega - this.cantidad)
    }
    this.inventariosService.actualizarInventario(this.cookieService.get('Token'), this.inventarioForm.value).subscribe(
      () => {
        this.modalTitle = '';
        this.modalContent = 'La cantidad del inventario ha sido eliminada exitosamente';
        this.isModalOpen = true;

        // Espera de 3 segundos antes de redirigir
        setTimeout(() => {
          this.router.navigateByUrl('/modificarCantidad');
        }, 2000); // 3000 milisegundos = 3 segundos
      },
      (error) => {
        this.modalTitle = '';
        this.modalContent = 'Hubo un problema al hacer la eliminación de la cantidad del inventario. Intente de nuevo.';
        this.isModalOpen = true;
      }
    );
  }
}
