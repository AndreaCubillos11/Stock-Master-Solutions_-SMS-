import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../serviciosAdministradores/productos.service';
import { CookieService } from 'ngx-cookie-service';
import { TiendasService } from '../../serviciosAdministradores/tiendas.service';
import { InventariosService } from '../../serviciosAdministradores/inventarios.service';
import { UsuariosService } from 'src/app/modulo-admin/serviciosAdministradores/usuarios.service';
 
 
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
    fechaUltimaActualizacion:[new Date()]
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
  usuario:any;
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productos: ProductosService,
    private cookieService: CookieService,
    private tiendasService: TiendasService,
    private inventariosService: InventariosService,
    private UsuariosService: UsuariosService
  ) { }
 
  ngOnInit() {
    this.consultarUsuario();
  }
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
    this.inventarioForm.patchValue({
      idInventario: this.inventario.idInventario,
      productoId: this.producto.productoId,
      cantidadMinima: this.inventario.cantidadMinima,
      ubicacionTienda: this.inventario.ubicacionTienda,
      tiendaId: this.usuario.idTiendas
    });
 
    if (this.tiendaSeleccionada) {
      this.inventarioForm.patchValue({
        cantidad: this.inventario.cantidad + this.cantidad,
        cantidadBodega: this.inventario.cantidadBodega
      });
    } else {
      this.inventarioForm.patchValue({
        cantidad: this.inventario.cantidad,
        cantidadBodega: this.inventario.cantidadBodega + this.cantidad
      });
    }
 
    this.inventariosService.actualizarInventario(this.cookieService.get('Token'), this.inventarioForm.value).subscribe(
      () => {
        this.modalTitle = '';
        this.modalContent = 'La cantidad del inventario ha sido modificada exitosamente';
        this.isModalOpen = true;
 
        // Redirige después de 3 segundos
        setTimeout(() => {
          this.router.navigateByUrl('/modificarCantidad');
        }, 2000);
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
    console.log(this.inventario)
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
    this.tiendaSeleccionada = (event.target as HTMLInputElement).checked;
    this.bodegaSeleccionada = !this.tiendaSeleccionada;
    console.log('Tienda seleccionada:', this.tiendaSeleccionada);
  }
 
  onBodegaChange(event: Event) {
    this.bodegaSeleccionada = (event.target as HTMLInputElement).checked;
    this.tiendaSeleccionada = !this.bodegaSeleccionada;
    console.log('Bodega seleccionada:', this.bodegaSeleccionada);
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
    this.inventarioForm.patchValue({
      idInventario: this.inventario.idInventario,
      productoId: this.producto.productoId,
      cantidadMinima: this.inventario.cantidadMinima,
      ubicacionTienda: this.inventario.ubicacionTienda
    });
 
    if (this.tiendaSeleccionada) {
      this.inventarioForm.patchValue({
        cantidad: this.inventario.cantidad - this.cantidad,
        cantidadBodega: this.inventario.cantidadBodega
      });
    } else {
      this.inventarioForm.patchValue({
        cantidadBodega: this.inventario.cantidadBodega - this.cantidad
      });
    }
 
    this.inventariosService.actualizarInventario(this.cookieService.get('Token'), this.inventarioForm.value).subscribe(
      () => {
        this.modalTitle = '';
        this.modalContent = 'La cantidad del inventario ha sido eliminada exitosamente';
        this.isModalOpen = true;
 
        setTimeout(() => {
          this.router.navigateByUrl('/modificarCantidad');
        }, 2000);
      },
      (error) => {
        this.modalTitle = '';
        this.modalContent = 'Hubo un problema al hacer la eliminación de la cantidad del inventario. Intente de nuevo.';
        this.isModalOpen = true;
      }
    );
  }
  consultarUsuario() {
    this.UsuariosService.consultarUsuario(this.cookieService.get('Token'), localStorage.getItem('IdUsuario')).subscribe(
      data => {
        this.usuario = data;
        if (this.usuario && this.usuario.idTiendas) {
          this.inventarioForm.patchValue({ tiendaId: this.usuario.idTiendas });
        } else {
          console.warn("idTiendas no está definido en el usuario");
        }
      },
      error => {
        console.error("Error al consultar el usuario:", error);
      }
    );
  }
 
  closeModal() {
    this.isModalOpen = false;
  }
 
}
