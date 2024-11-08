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
  producto:any;
  codigoBarras:any;
  tienda:any;
  usuario:any;
  idTienda:any;
  isFacturaVisible:boolean=false;
  quantity: number = 1;
  metodoPago:any;

  ngOnInit() {
    this.consultarUsuario();
  } 

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productos: ProductosService,
    private cookieService:CookieService,
    private UsuariosService:UsuariosService,
    private tiendasService:TiendasService
  ) { }
  consultarProduct(){
    this.productos.consultarProducto(this.cookieService, this.codigoBarras ).subscribe(
      data => { this.producto = data
      }
    )
  }
  consultarTienda() {
    this.tiendasService.consultarTienda(this.cookieService.get('Token'), this.idTienda).subscribe(
      data => { this.tienda = data 
      }
    )
  }
  consultarUsuario() {
    this.UsuariosService.consultarUsuario(this.cookieService.get('Token'), localStorage.getItem('IdUsuario')).subscribe(
      data => {
        this.usuario = data
        this.idTienda=this.usuario.idTiendas
      }
    )
  }
  llamarTienda(){
    this.consultarTienda(); 
    this.isFacturaVisible=true;
  }

  closeModal(){
    this.isFacturaVisible=false;
  }
  increaseQuantity(): void {
    this.quantity++;
  }

  // Método para disminuir la cantidad
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}

