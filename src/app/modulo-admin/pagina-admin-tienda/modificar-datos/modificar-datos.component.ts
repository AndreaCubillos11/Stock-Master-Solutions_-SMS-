import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../serviciosAdministradores/productos.service';
import { CookieService } from 'ngx-cookie-service';
import { TiendasService } from '../../serviciosAdministradores/tiendas.service';
import { InventariosService } from '../../serviciosAdministradores/inventarios.service';
import { UsuariosService } from 'src/app/modulo-admin/serviciosAdministradores/usuarios.service';

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.component.html',
  styleUrls: ['./modificar-datos.component.css']
})
export class ModificarDatosComponent {

  datosHeader = [
    { titulo: 'Modificar Datos', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];
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
  
  usuario:any;
  inventario:any;
  codigoBarras:any;
  producto:any;
  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  cantidad:any;
  ubicaciontienda: string= '';
  tienda:any;
  ngOnInit() {
    this.consultarUsuario();
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productos: ProductosService,
    private cookieService: CookieService,
    private tiendasService: TiendasService,
    private inventariosService: InventariosService,
    private UsuariosService: UsuariosService
  ) { }

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
  consultarProduct() {
    this.productos.consultarProducto(this.cookieService.get('Token'), this.codigoBarras).subscribe(
      data => {
        if (data) {
          this.producto = data;
          this.consultarInventario();
          this.consultarTienda();
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
      tiendaId: this.usuario.idTiendas,
      cantidad: this.inventario.cantidad,
      cantidadBodega: this.inventario.cantidadBodega,
      cantidadMinima: this.cantidad,
      ubicacionTienda: this.ubicaciontienda
    });

    console.log("Formulario antes de enviar:", this.inventarioForm.value);
 
    this.inventariosService.actualizarInventario(this.cookieService.get('Token'), this.inventarioForm.value).subscribe(
      () => {
        this.modalTitle = '';
        this.modalContent = 'La datos del inventario han sido modificados exitosamente';
        this.isModalOpen = true;
 
        // Redirige después de 3 segundos
        setTimeout(() => {
          this.router.navigateByUrl('/gestionAdminT');
        }, 2000);
      },
      (error) => {
        this.modalTitle = '';
        this.modalContent = 'Hubo un problema al hacer la modificación. Intente de nuevo.';
        this.isModalOpen = true;
      }
    );
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
  consultarTienda() {
    this.tiendasService.consultarTienda(this.cookieService.get('Token'), this.usuario.idTiendas).subscribe(
      data => { this.tienda = data; }
    );
  }
  closeModal() {
    this.isModalOpen = false;
  }
  volver(){
    this.router.navigate(['/gestionAdminT'])
   }
}
