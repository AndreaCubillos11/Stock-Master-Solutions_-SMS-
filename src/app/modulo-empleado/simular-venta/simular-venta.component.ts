import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductosService } from 'src/app/modulo-admin/serviciosAdministradores/productos.service';
import { TiendasService } from 'src/app/modulo-admin/serviciosAdministradores/tiendas.service';
import { UsuariosService } from 'src/app/modulo-admin/serviciosAdministradores/usuarios.service';
 
@Component({
  selector: 'app-simular-venta',
  templateUrl: './simular-venta.component.html',
  styleUrls: ['./simular-venta.component.css']
})
 
 
 
export class SimularVentaComponent {
  datosHeader = [
    { titulo: 'Simular Venta', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];
  producto: any;
  codigoBarras: any;
  tienda: any;
  usuario: any;
  idTienda: any;
  isFacturaVisible: boolean = false;
  quantity: number = 1;
  metodoPago: any;
  productosList: any[] = [];
  currentDate: Date = new Date();
  lastCodigoBarras: any; // Para almacenar el último código consultado
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productos: ProductosService,
    private cookieService: CookieService,
    private UsuariosService: UsuariosService,
    private tiendasService: TiendasService
  ) {}
 
  ngOnInit() {
    this.consultarUsuario();
  }
 
  consultarProduct() {
    if (this.codigoBarras && this.codigoBarras !== this.lastCodigoBarras) {
      this.lastCodigoBarras = this.codigoBarras;
      this.productos.consultarProducto(this.cookieService.get('Token'), this.codigoBarras).subscribe(
        data => {
          if (data) {
            this.producto = data;
            this.productosList.push({ ...this.producto, quantity: this.quantity });
          }
        },
        error => {
          console.error("Error al consultar el producto:", error);
        }
      );
    }
  }
 
  getTotal(): number {
    return this.productosList.reduce((total, item) => total + item.precio * item.quantity, 0);
  }
 
  closeModal() {
    this.isFacturaVisible = false;
  }
 
  increaseQuantity(): void {
    this.quantity++;
  }
 
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
 
  consultarUsuario() {
    this.UsuariosService.consultarUsuario(this.cookieService.get('Token'), localStorage.getItem('IdUsuario')).subscribe(
      data => {
        this.usuario = data;
        this.idTienda = this.usuario.tiendaId;
      }
    );
  }
 
  consultarTienda() {
    this.tiendasService.consultarTienda(this.cookieService.get('Token'), this.idTienda).subscribe(
      data => { this.tienda = data; }
    );
  }
  llamarTienda() {
    this.consultarTienda();
    this.isFacturaVisible = true;
  }
}
 
