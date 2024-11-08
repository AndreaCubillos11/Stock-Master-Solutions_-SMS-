import { Component, OnInit, OnDestroy,ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { ServicioDevolucionesService } from 'src/app/serviciosGenerales/servicio-devoluciones.service';
import { ReporteDevolucion } from 'src/models/reporteDevoluciones.model';

@Component({
  selector: 'app-pagina-reportes',
  templateUrl: './pagina-reportes.component.html',
  styleUrls: ['./pagina-reportes.component.css']
})
export class PaginaReportesComponent implements OnInit, OnDestroy{
  @ViewChild('lineChartCanvas') private lineChartCanvas: ElementRef | undefined;

  chart: any;

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
  productos: string[] = [];
  devolucionesPorProducto: number[] = [];

  constructor(private servicioDevoluciones: ServicioDevolucionesService, private cookie: CookieService) {

  }

  ngOnInit(): void {
    this.cargarDevoluciones()
  }

  ngOnDestroy(): void {
    this.devoluciones = []
  }

  //Creacion grafica Patrones
  createLineChart(): void {
    // Datos para la gráfica
   /*  const sumaEnero = 0;
    const sumaFebrero = 0;
    const sumaMarzo = 0;
    const sumaAbril = 0;
    const sumaMayo = 0;
    const sumaJunio = 0;
    const sumaJulio = 0;
    const sumaAgosto = 0;
    const sumaSeptiembre = 0;
    const sumaOcutubre = 0;
    const sumaNoviembre = 0;
    const sumaDiciembre = 0; */
    const lineChartData: ChartData<'line'> = {
      labels: [], // Eje X
      datasets: [
        {
          data: [], // Datos de la gráfica
          label: 'Ventas',
          borderColor: '#42A5F5',
          fill: false,
          tension: 0.1
        }
      ]
    };

    // Configuración de la gráfica
    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line', // Tipo de gráfica
      data: lineChartData,
      options: {
        responsive: true, // Hacer que la gráfica sea responsive
        scales: {
          x: {
            title: {
              display: true,
              text: 'Meses'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Ventas'
            },
            min: 0
          }
        }
      }
    };

    // Crear el gráfico en el canvas usando Chart.js
    this.chart = new Chart(this.lineChartCanvas?.nativeElement, chartConfig);
  }
  //Fin grafica Patrones

  //Inicio Grafica devolucion
  obtenerProductosConMasDevoluciones(): void {
    // Contar el número de devoluciones por producto
    const conteoDevoluciones: { [key: number]: number } = {};

    this.devoluciones.forEach(devolucion => {
      if (conteoDevoluciones[devolucion.productoId]) {
        conteoDevoluciones[devolucion.productoId]++;
      } else {
        conteoDevoluciones[devolucion.productoId] = 1;
      }
    });

    // Convertir el objeto en un arreglo de [productoId, devoluciones]
    const productosOrdenados = Object.entries(conteoDevoluciones)
      .map(([productoId, devoluciones]) => ({
        productoId: parseInt(productoId),
        devoluciones
      }))
      .sort((a, b) => b.devoluciones - a.devoluciones); // Ordenar de mayor a menor devoluciones

    // Tomar los 5 productos con más devoluciones
    const top5Productos = productosOrdenados.slice(0, 5);

    // Preparar los datos para la gráfica
    this.productos = top5Productos.map(producto => `Producto ${producto.productoId}`);
    this.devolucionesPorProducto = top5Productos.map(producto => producto.devoluciones);

    // Crear la gráfica
    this.crearGrafica();
  }

  crearGrafica(): void {
    const chartData: ChartData = {
      labels: this.productos, // Etiquetas con los productos
      datasets: [
        {
          label: 'Número de Devoluciones',
          data: this.devolucionesPorProducto, // Datos con las devoluciones
          backgroundColor: '#42A5F5', // Color de las barras
          borderColor: '#1E88E5', // Color del borde de las barras
          borderWidth: 1
        }
      ]
    };

    const chartOptions: ChartOptions = {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Productos'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Número de Devoluciones'
          },
          min: 0
        }
      }
    };

    this.chart = new Chart('barChartCanvas', {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  }
  //Fin Grafica Devolucion

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

  /* obtenerMeses(): void {
    for (let i = 0; i < this.devoluciones.length; i++) {
      const mes = this.devoluciones[i].fechaDevolucion.getMonth();
      switch (mes) {
        case 0:

          break;
        case 1:

          break;
        case 2:

          break;
        case 3:

          break;
        case 4:

          break;
        case 5:

          break;
        case 6:

          break;
        case 7:

          break;
        case 8:

          break;
        case 10:

          break;
        case 11:

          break;

        default:
          break;
      }
    }
  } */

  mostrarCampo(event: any) {
    const idReporte = event.value;
    /* if (idReporte == 1) {
      this.cargarDevoluciones
    } */
    this.seleccionPatronVentas = idReporte == 1 ? true : false;
  }
}
