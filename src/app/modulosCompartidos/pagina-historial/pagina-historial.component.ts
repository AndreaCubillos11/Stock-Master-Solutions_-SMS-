import { Component, OnInit } from '@angular/core';
import { Devolucion } from 'src/models/devolucion.model';
import { MovimientoInventario } from 'src/models/movimientoInventario.model';
import { ServicioDevolucionesService } from 'src/app/serviciosGenerales/servicio-devoluciones.service';
import { CookieService } from 'ngx-cookie-service';
 
@Component({
  selector: 'app-pagina-historial',
  templateUrl: './pagina-historial.component.html',
  styleUrls: ['./pagina-historial.component.css']
})
export class PaginaHistorialComponent implements OnInit{
  seleccionable = true;
  datosHeader = [
    { titulo: 'Historial productos', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  datosTabla = [
    {
      datos: [] as Array<MovimientoInventario | Devolucion>,
      seleccionable: false,
    }
  ];
 
  historial: MovimientoInventario[] = [];
  devoluciones: Devolucion[] = [];
  datos: Array<MovimientoInventario | Devolucion> = [];
  mostrandoDevoluciones: boolean = false;
 
  constructor(private servicioDevoluciones: ServicioDevolucionesService, private cookie : CookieService){
 
  }
 
  ngOnInit(): void {
    this.cargarDevoluciones();
  }
 
  cargarDevoluciones(): void {
    this.servicioDevoluciones.getAllDevoluciones(this.cookie.get('Token')).subscribe({
      next: (data: Devolucion[]) => {
        this.devoluciones = data;
        console.log('Devoluciones cargadas:', this.devoluciones);
      },
      error: (error) => {
        console.error('Error al cargar devoluciones', error);
      }
    });
  }
 
  /* cargarHistorial(): void {
    this.servicioInventario.getAllMovimientos().subscribe({
      next: (data: MovimientoInventario[]) => {
        this.historial = data;
        console.log('Historial cargado:', this.historial);
      },
      error: (error) => {
        console.error('Error al cargar historial', error);
      }
    });
  } */
 
 
  toggleDevoluciones() {
    this.mostrandoDevoluciones = !this.mostrandoDevoluciones;
    this.datos = this.mostrandoDevoluciones ? this.devoluciones : this.historial;
    this.datosHeader[0].titulo = this.mostrandoDevoluciones ? 'Historial devoluciones' : 'Historial productos';
  }
 
 
}