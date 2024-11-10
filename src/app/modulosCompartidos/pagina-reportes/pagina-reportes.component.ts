import { Component, OnInit, OnDestroy,ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { ServicioDevolucionesService } from 'src/app/serviciosGenerales/servicio-devoluciones.service';
import { ReporteDevolucion } from 'src/models/reporteDevoluciones.model';
import { ReportePatron } from 'src/models/reportePatrones.model';

@Component({
  selector: 'app-pagina-reportes',
  templateUrl: './pagina-reportes.component.html',
  styleUrls: ['./pagina-reportes.component.css']
})
export class PaginaReportesComponent implements OnInit, OnDestroy{
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef;
  
  chart: any;
  reporteSeleccionado: string = '';
  rangoSeleccionado: string = '';
  idProducto: number | null = null;

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

  devoluciones: ReporteDevolucion[] = [];
  productos: string[] = [];
  devolucionesPorProducto: number[] = [];
  ventas: ReportePatron[] = [];

  constructor(private servicioDevoluciones: ServicioDevolucionesService, private cookie: CookieService) {

  }

  ngOnInit(): void {
    this.cargarDevoluciones()
  }

  ngOnDestroy(): void {
      this.chart.destroy();
  }

  seleccionarReporte(id: string) {
    this.reporteSeleccionado = id;
    this.rangoSeleccionado = ''; // Resetea el rango cuando cambia el reporte
    this.idProducto = null; // Resetea el ID del producto cuando cambia el reporte
  }

  // Función para seleccionar el rango de tiempo
  seleccionarRango(id: string) {
    this.rangoSeleccionado = id;
  }

  generarGrafica() {
    // Eliminar el gráfico anterior si existe
    if (this.chart) {
      this.chart.destroy();
    }
    // Crear un nuevo gráfico según el reporte seleccionado
    switch (this.reporteSeleccionado) {
      case '1':
        if (this.rangoSeleccionado && !(this.idProducto == null)) {
          this.generarGraficaVentas();
        }
        break;
      case '2':
        this.generarGraficaProductosMasVendidos();
        break;
      case '3':
        this.generarGraficaDevoluciones();
        break;
      default:
        console.log('Selecciona un reporte válido');
        break;
    }
  }

  //Creacion grafica Patrones
  generarGraficaVentas() {
    const datos = this.obtenerDatosAgrupados(); // Datos de ventas agrupados
    this.chart = new Chart(this.lineChartCanvas.nativeElement, {
      type: 'line', // Tipo de gráfico (puedes cambiar a 'line' si prefieres gráfico de línea)
      data: {
        labels: datos.labels, // Etiquetas de los datos
        datasets: [{
          label: 'Ventas',
          data: datos.values, // Datos de las ventas
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  //Fin grafica Patrones

  //grafica Productos mas vendidos
  generarGraficaProductosMasVendidos() {
    // Lógica para crear la gráfica de productos más vendidos
    this.chart = new Chart(this.lineChartCanvas.nativeElement, {
      type: 'bar', // Tipo de gráfico
      data: {
        labels: ['Producto 1', 'Producto 2', 'Producto 3'], // Ejemplo de etiquetas
        datasets: [{
          label: 'Productos más vendidos',
          data: [30, 50, 70], // Ejemplo de datos
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  //finGrafica

  //Inicio Grafica devolucion
  generarGraficaDevoluciones() {
    const chartData: ChartData = {
      labels: this.productos, // Etiquetas de los productos con más devoluciones
      datasets: [{
        label: 'Número de Devoluciones',
        data: this.devolucionesPorProducto, // Datos de devoluciones por producto
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1
      }]
    };

    const chartOptions: ChartOptions = {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Productos' } },
        y: { title: { display: true, text: 'Número de Devoluciones' }, min: 0 }
      }
    };

    this.chart = new Chart(this.lineChartCanvas.nativeElement, {
      type: 'bar', // Tipo de gráfico
      data: chartData,
      options: chartOptions
    });
  }
  //Fin Grafica Devolucion

  obtenerDatosAgrupados() {
    const labels: string[] = [];
    const values: number[] = [];

    switch (this.rangoSeleccionado) {
      case '1':
        // Agrupación mensual: suma ventas por día
        const ventasPorDia = this.ventas.reduce((acc, ventas) => {
          const fecha = ventas.fechaMovimiento.toLocaleDateString();
          acc[fecha] = (acc[fecha] || 0) + ventas.cantidad;
          return acc;
        }, {} as Record<string, number>);
    
        Object.entries(ventasPorDia).forEach(([fecha, cantidad]) => {
          labels.push(fecha);
          values.push(cantidad);
        });
        break;
    
      case '2':
        // Agrupación anual: suma ventas por mes
        const ventasPorMes = this.ventas.reduce((acc, ventas) => {
          const mes = ventas.fechaMovimiento.getMonth() + 1;
          acc[mes] = (acc[mes] || 0) + ventas.cantidad;
          return acc;
        }, {} as Record<number, number>);
    
        Object.entries(ventasPorMes).forEach(([mes, cantidad]) => {
          labels.push(`Mes ${mes}`);
          values.push(cantidad);
        });
        break;
    
      default:
        console.warn('Rango de tiempo no válido');
        break;
    }

    return { labels, values };
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
  
}
