import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServicioDevolucionesService } from 'src/app/serviciosGenerales/servicio-devoluciones.service';
import { ReporteDevolucion } from 'src/models/reporteDevoluciones.model';

@Component({
  selector: 'app-pagina-reportes',
  templateUrl: './pagina-reportes.component.html',
  styleUrls: ['./pagina-reportes.component.css']
})
export class PaginaReportesComponent implements OnInit{
  datosHeader = [
    { titulo: 'Reportes generales', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  reportes = [
    { id: '1', opcion: 'Patrones de venta' },
    { id: '2', opcion: 'Productos mas vendidos' },
    { id: '3', opcion: 'Registro de devoluciones' }
  ]

  rangoDeTiempo = [
    { id: '1', opcion: 'Mensual' },
    { id: '2', opcion: 'Anual' },
  ]

  seleccionPatronVentas: boolean = false;

  devoluciones: ReporteDevolucion[] = [];

  constructor(private servicioDevoluciones: ServicioDevolucionesService, private cookie : CookieService){
 
  }

  ngOnInit(): void {
    this.cargarDevoluciones()
  }

  cargarDevoluciones(): void {
    this.servicioDevoluciones.getReporteDevoluciones(this.cookie.get('Token')).subscribe({
      next: (data: ReporteDevolucion[]) => {
        this.devoluciones = data;
      },
      error: (error) => {
        console.error('Error al cargar devoluciones', error);
      }
    });
  }

  
  mostrarCampo(event: any) {
    const idReporte = event.value;
    /* if (idReporte == 1) {
      this.cargarDevoluciones
    } */
    this.seleccionPatronVentas = idReporte == 1 ? true : false;
  }
}
