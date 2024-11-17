import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TiendasService } from 'src/app/modulo-admin/serviciosAdministradores/tiendas.service';
import { InventariosService } from 'src/app/modulo-admin/serviciosAdministradores/inventarios.service';
import { CookieService } from 'ngx-cookie-service';
import { Tienda } from 'src/models/tienda.model';
import { Inventario } from 'src/models/inventario.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Producto } from 'src/models/producto.model';
import { ProductosService } from 'src/app/modulo-admin/serviciosAdministradores/productos.service';

@Component({
  selector: 'comp-selectores',
  templateUrl: './comp-selectores.component.html',
  styleUrls: ['./comp-selectores.component.css'],
  animations: [
    trigger('transformPanel', [
      state('done', style({ transform: 'translateY(0)' })),
      transition('* => done', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class CompSelectoresComponent implements OnInit {
  @Output() inventariosEnviados = new EventEmitter<Inventario[]>();
  
  tiendas: Tienda[] = [];

  inventarios: Inventario[] = [];

  inventario!: Inventario;

  productos: Producto[] = [];

  camposInventarios = [
    { value: 1, label: 'Aseo' },
    { value: 2, label: 'Tecnologia' },
    { value: 3, label: 'Comida' },
    { value: 4, label: 'Ropa' },
  ]

  seleccionado = false;
  tiendaSeleccionada!: number;
  inventarioSeleccionado: number | null = null;
  rolUser: number = parseInt(localStorage.getItem('Rol') ?? '0', 10);

  constructor(private tiendaService: TiendasService, private inventarioService: InventariosService,
     private cookieService: CookieService, private productosService: ProductosService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.rolUser == 1) {
      this.obtenerTiendas();
    } else {
      this.seleccionado = true;
      this.tiendaSeleccionada = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);
      
    }
    this.getInventarios();
  }

  seleccionTienda(event: any) {
    this.seleccionado = true;
    //this.cargarProductos()
    this.getInventarios()
    this.inventarioSeleccionado = null;
  }

  seleccionInventario(event: any) {
    console.log(this.inventarioSeleccionado);
    this.getInventario()
  }

  cargarProductos(): void {
    this.productosService.getAllProductos(this.cookieService.get('Token')).subscribe({
      next: (data: Producto[]) => {
        console.log(data);
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos', error);
      }
    });
  }

  obtenerTiendas() {
    this.tiendaService.getTienda(this.cookieService.get('Token')).subscribe({
      next: (data: Tienda[]) => {
        console.log(data);
        this.tiendas = data;
        console.log(this.tiendas)
      },
      error: (error) => {
        console.error('Error al obtener las tiendas', error);
      }
    });
  }

  getInventario() {
    if(this.inventarioSeleccionado){
      this.inventarioService.getInventario(this.cookieService.get('Token'), this.inventarioSeleccionado).subscribe((data: Inventario) => {
        console.log(data);
        //this.inventario = data;
        const inventarioArray: Inventario[] = [data];
        this.inventariosEnviados.emit(inventarioArray);
      });
    }
  }

  getInventarios() {
    this.inventarioService.getInventariosTienda(this.cookieService.get('Token'), this.tiendaSeleccionada).subscribe((data: Inventario[]) => {
      console.log(data);
      this.inventarios = data;
      this.inventariosEnviados.emit(this.inventarios);
      console.log('Disparado');
    });
  }

}
