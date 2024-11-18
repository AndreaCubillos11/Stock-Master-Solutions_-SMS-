import { Component, OnInit, OnDestroy } from '@angular/core';
import { Devolucion } from 'src/models/devolucion.model';
import { MovimientoInventario } from 'src/models/movimientoInventario.model';
import { ServicioDevolucionesService } from 'src/app/serviciosGenerales/servicio-devoluciones.service';
import { CookieService } from 'ngx-cookie-service';
import { InventariosService } from 'src/app/modulo-admin/serviciosAdministradores/inventarios.service';
import { ServicioHistorialService } from 'src/app/serviciosGenerales/servicio-historial.service';

@Component({
  selector: 'app-pagina-historial',
  templateUrl: './pagina-historial.component.html',
  styleUrls: ['./pagina-historial.component.css']
})
export class PaginaHistorialComponent implements OnInit, OnDestroy {

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  seleccionable = true;
  datosHeader = [
    { titulo: 'Historial productos', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  datosMovimientos = [
    {
      datos: [] as MovimientoInventario[],
      seleccionable: false,
    }
  ];

  datosDevoluciones = [
    {
      datos: [] as Devolucion[],
      seleccionable: false,
    }
  ];

  historial: MovimientoInventario[] = [];
  devoluciones: Devolucion[] = [];
  datos: Array<MovimientoInventario | Devolucion> = [];
  mostrandoDevoluciones: boolean = false;

  rolUser: number = parseInt(localStorage.getItem('Rol') ?? '0', 10);
  idTiendaUsuario!: number;


  constructor(private servicioDevoluciones: ServicioDevolucionesService, private cookie: CookieService,
    private servicioHistorial: ServicioHistorialService
  ) { }

  ngOnInit(): void {
    if (this.rolUser === 1) {
      this.cargarAllMovimientos();
    } else {
      this.idTiendaUsuario = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);
      this.cargarMovimientosTienda()
    }
    this.cargarDevoluciones();
  }

  ngOnDestroy(): void {
    this.historial = [];
    this.devoluciones = []
    this.datosDevoluciones = [];
    this.datosMovimientos = [];
  }

  cargarDevoluciones(): void {
    this.servicioDevoluciones.getAllDevoluciones(this.cookie.get('Token')).subscribe({
      next: (data: Devolucion[]) => {
        if (data && data.length > 0) {
          this.devoluciones = data;
          this.datosDevoluciones[0].datos = data;
          this.datosDevoluciones = [{
            ...this.datosDevoluciones[0],
            datos: [...data]
          }]
          console.log('Devoluciones cargadas:', this.devoluciones);
        } else {
          this.openModal('Sin datos', `No existen devoluciones reqgistradas`)
        }

      },
      error: (error) => {
        console.error('Error al cargar devoluciones', error);
      }
    });
  }

  cargarAllMovimientos(): void {
    this.servicioHistorial.getAllMovimientos(this.cookie.get('Token')).subscribe({
      next: (data: MovimientoInventario[]) => {
        if (data && data.length > 0) {
          this.historial = data;
          this.datosMovimientos[0].datos = data;
          this.datosMovimientos = [{
            ...this.datosMovimientos[0],
            datos: [...data]
          }]
          console.log('Historial cargado:', this.historial);
        } else {
          this.openModal('Sin datos', `No existen Movimientos en inventarios, porfavor comuniquese con su administrador`)
        }
      },
      error: (error) => {
        console.error('Error al cargar historial', error);
      }
    });
  }

  cargarMovimientosTienda(): void {
    this.servicioHistorial.getMovimientosTienda(this.cookie.get('Token'), 0).subscribe({
      next: (data: MovimientoInventario[]) => {
        console.log(data);
        if (data && data.length > 0) {
          this.historial = data;
          this.datosMovimientos[0].datos = data;
          this.datosMovimientos = [{
            ...this.datosMovimientos[0],
            datos: [...data]
          }]
          console.log('Historial cargado:', this.historial);
        } else {
          this.openModal('Sin datos', `No existen Movimientos en inventarios, porfavor comuniquese con su administrador`)
        }

      },
      error: (error) => {
        console.error('Error al cargar historial', error);
        this.openModal('Error al recuperar datos', error)
      }
    });
  }


  toggleDevoluciones() {
    this.mostrandoDevoluciones = !this.mostrandoDevoluciones;
    this.datos = this.mostrandoDevoluciones ? this.devoluciones : this.historial;
    this.datosHeader[0].titulo = this.mostrandoDevoluciones ? 'Historial devoluciones' : 'Historial productos';
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