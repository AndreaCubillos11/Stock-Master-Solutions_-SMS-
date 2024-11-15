import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../serviciosAdministradores/usuarios.service';
import { CookieService } from 'ngx-cookie-service';
import { TiendasService } from '../serviciosAdministradores/tiendas.service';
import { ProductosService } from '../serviciosAdministradores/productos.service';
import { FormsModule } from '@angular/forms';
import { Producto } from 'src/models/producto.model';
import { Tienda } from 'src/models/tienda.model';
import { InventariosService } from '../serviciosAdministradores/inventarios.service';
import { Inventario } from 'src/models/inventario.model';

@Component({
  selector: 'app-pagina-admin',
  templateUrl: './pagina-admin.component.html',
  styleUrls: ['./pagina-admin.component.css']
})
export class PaginaAdminComponent implements OnInit{

  idUser: number = parseInt(localStorage.getItem('Rol') ?? '0', 10);
  idTienda = 0;
  usuario: any;
  tienda: any;
  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  isConsultarTiendaVisible: boolean = false;
  isEliminarVisible: boolean = false;
  isConfirmarVisible: boolean = false;

  selectedOption: string = 'optionTienda'; // Valor inicial
  mostrarCRUD: boolean = false;
  tiendaSeleccionada!: number;

  tiendas: Tienda[] = [];

  tiendaUser!: Tienda;

  inventarios: Inventario[] = [];

  datosBtn = [
    { texto: 'Agregar entidad producto', img: 'Añadir.svg', nombreClase: 'agregar', accion: this.agregarProducto.bind(this) },
    { texto: 'Modificar producto', img: 'ModificarProducto.svg', nombreClase: 'modificar', accion: this.modificarProducto.bind(this) },
    { texto: 'Eliminar producto', img: 'Eliminar.svg', nombreClase: 'eliminar', accion: this.eliminarProducto.bind(this) }
  ];

  datosBtnTiendas = [
    { texto: 'Agregar nueva tienda', img: 'Añadir.svg', nombreClase: 'agregar', accion: this.agregarTienda.bind(this) },
    { texto: 'Modificar datos de tienda', img: 'ModificarProducto.svg', nombreClase: 'modificar', accion: this.modificarTienda.bind(this) },
    { texto: 'Eliminar tienda', img: 'Eliminar.svg', nombreClase: 'eliminar', accion: this.eliminarTienda.bind(this) }
  ];
  
  datosProductos = [
    {
      datos: [] as Producto[],
      seleccionable: false
    }
  ];

  datosTiendas = [
    {
      datos: [] as Tienda[],
      seleccionable: false
    }
  ];

  datosInventarios = [
    {
      datos: [] as Inventario[],
      seleccionable: false
    }
  ];

  constructor(private router: Router,
    private inventarioService: InventariosService,
    private cookieService: CookieService,
    private tiendasService: TiendasService,
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.cargarProductos()
    /* if (this.idUser == 1) {
      this.idTienda = this.tiendaSeleccionada;
      console.log(this.idTienda);
      this.obtenerTienda()
    }else{
      this.obtenerTienda()
    } */
    this.obtenerTiendas()
  }

  agregarProducto() {
    //console.log('Agregar nueva tienda');
    this.router.navigate(['/crearProducto']);
  }

  modificarProducto() {
    //console.log('Modificar datos de tienda');
    this.router.navigate(['/modificarProducto']);
  }

  eliminarProducto() {
    //console.log('Eliminar tienda');
    this.router.navigate(['/eliminarProducto']);
  }

  consultarTienda() {
    this.tiendasService.consultarTienda(this.cookieService.get('Token'), this.idTienda).subscribe(
      data => { this.tienda = data 
        localStorage.setItem('IdTienda', JSON.parse(JSON.stringify(data)).id);
      }
    )
  }

  seleccionTienda(event: any) {
    //this.seleccionado = true;
    console.log(this.tiendaSeleccionada);
    this.getInventarios()
    //this.inventarioSeleccionado = null;
  }


  actualizarTienda() {
    this.router.navigate(['/modificarTienda']).then(() => {
    })
  }

  tiendaEliminar(idEliminar: any) {
    this.tiendasService.eliminarTienda(this.cookieService.get('Token'), idEliminar).subscribe(
      () => {
        this.modalTitle = '';
        this.modalContent = '¡La tienda ha sido eliminada exitosamente';
        this.isModalOpen = true;
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2000 milisegundos = 2 segundos 
      },
      (error) => {
        this.modalTitle = '';
        this.modalContent = 'Hubo un problema al eliminar la tienda. Intente de nuevo.';
        this.isModalOpen = true;
      }
    );
  }
  closeModal() {
    this.isModalOpen = false;
  }
  closeModalEliminar() {
    this.isConsultarTiendaVisible = false;
  }


  agregarTienda() {
    this.router.navigate(['/crearTienda']);
  }

  modificarTienda() {
    this.isConsultarTiendaVisible = true;
  }
  closeModalModificar() {
    this.isConsultarTiendaVisible = false;
  }

  eliminarTienda() {
    this.isEliminarVisible = true
  }
  closeModalEliminarT() {
    this.isEliminarVisible = false;
  }
  closeModalConfirmar() {
    this.isConfirmarVisible = false;
  }

  confirmacion() {
    console.log('Confirmacion')
    this.isConfirmarVisible = true;

  }

  toggleCRUD() {
    console.log('presionado');
    this.mostrarCRUD = !this.mostrarCRUD;
  }

  obtenerTiendas() {
    this.tiendasService.getTienda(this.cookieService.get('Token')).subscribe({
      next: (data: Tienda[]) => {
        console.log(data);
        this.tiendas = data;
        this.datosTiendas[0].datos = data;
        console.log()
      },
      error: (error) => {
        console.error('Error al obtener las tiendas', error);
      }
    });
  }

  cargarProductos(): void {
    this.productosService.getAllProductos(this.cookieService.get('Token')).subscribe({
      next: (data: Producto[]) => {
        //console.log(data);
        this.datosProductos[0].datos = data;
        console.log(this.datosProductos[0].datos)
      },
      error: (error) => {
        console.error('Error al obtener los productos', error);
      }
    });
  }

  obtenerTienda() {
    this.tiendasService.consultarTienda(this.cookieService.get('Token'), this.idTienda).subscribe({
      next: (data: Tienda) => {
        console.log(data);
        this.tiendaUser = data;
        console.log(this.tiendaUser)
      },
      error: (error) => {
        console.error('Error al obtener las tiendas', error);
      }
    });
  }

  getInventarios() {
    console.log(this.tiendaSeleccionada);
    this.inventarioService.getInventariosTienda(this.cookieService.get('Token'), this.tiendaSeleccionada).subscribe((data: Inventario[]) => {
      this.inventarios = data;
    });
  }

}