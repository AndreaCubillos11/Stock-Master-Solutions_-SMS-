import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { InventariosService } from '../../serviciosAdministradores/inventarios.service';
import { TiendasService } from '../../serviciosAdministradores/tiendas.service';
import { ProductosService } from '../../serviciosAdministradores/productos.service';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitter } from '@angular/core';
import { UsuariosService } from 'src/app/modulo-admin/serviciosAdministradores/usuarios.service';

@Component({
  selector: 'app-eliminar-inventario',
  templateUrl: './eliminar-inventario.component.html',
  styleUrls: ['./eliminar-inventario.component.css']
})
export class EliminarInventarioComponent {

  datosTabla = [
    {
      datos: [],
      seleccionable: true,
      selectionChange: new EventEmitter<any | null>()
    }
  ];
  datosHeader = [
    { titulo: 'Eliminar Inventario', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver', accion: this.volver.bind(this) },
  ];
  usuario: any;
  filaSeleccionada: any | null = null;
  codigoBarras: any;
  producto: any;
  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productos: ProductosService,
    private cookieService: CookieService,
    private tiendasService: TiendasService,
    private inventariosService: InventariosService,
    private UsuariosService: UsuariosService
  ) { }

  onSelectionChange(fila: any | null) {
    this.filaSeleccionada = fila;
  }
  ngOnInit(): void {
    this.consultarInventarioPTienda();
    this.datosTabla[0].selectionChange.subscribe((fila: any | null) => this.onSelectionChange(fila))
  }
  volver() {
    this.router.navigate(['/gestionAdminT']);
  }
  consultarInventarioPTienda() {
    this.consultarUsuario();
    this.inventariosService.consultarInventarioTienda(this.cookieService.get('Token'), this.usuario.idTiendas).subscribe(
      data => {
        this.datosTabla[0].datos = data;

      },
      error => {
        console.error("Error al consultar el inventario:", error);
      }
    )
  };

  consultarUsuario() {
    this.UsuariosService.consultarUsuario(this.cookieService.get('Token'), localStorage.getItem('IdUsuario')).subscribe(
      data => {
        this.usuario = data;
        if (this.usuario && this.usuario.idTiendas) {

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
        }
      },
      error => {
        console.error("Error al consultar el producto:", error);
      }
    );
  }
  eliminarInventario() {
    if (this.filaSeleccionada) {
      const codigoFila = this.filaSeleccionada.idInventario
      this.inventariosService.eliminarInventario(this.cookieService.get('Token'), codigoFila).subscribe({
        next: (res) => {
          if (res) {
            this.modalTitle = '';
            this.modalContent = 'El inventario ha sido eliminado exitosamente';
            this.isModalOpen = true;
            setTimeout(() => {
              this.router.navigateByUrl('/gestionAdminT');
            }, 2000);
          } else {
            console.log(res)
          }
        },
        error: (err) => {
          this.modalTitle = '';
          this.modalContent = 'Hubo un problema al hacer la eliminación. Intente de nuevo.';
          this.isModalOpen = true;
        },
      });
    }
  }
}
