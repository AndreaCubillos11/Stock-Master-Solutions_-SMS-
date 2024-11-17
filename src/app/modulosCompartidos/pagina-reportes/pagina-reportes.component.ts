import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { TiendasService } from 'src/app/modulo-admin/serviciosAdministradores/tiendas.service';
import { ServicioReportesService } from 'src/app/serviciosGenerales/servicio-reportes.service';
import { ReporteDevolucion } from 'src/models/reporteDevoluciones.model';
import { ReportePatron } from 'src/models/reportePatrones.model';
import { ReporteProducto } from 'src/models/reporteProductos.model';
import { Tienda } from 'src/models/tienda.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pagina-reportes',
  templateUrl: './pagina-reportes.component.html',
  styleUrls: ['./pagina-reportes.component.css']
})
export class PaginaReportesComponent implements OnInit, OnDestroy {
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef;

  idUser: number = parseInt(localStorage.getItem('Rol') ?? '0', 10);
  idTienda!: number;
  chart!: Chart;
  reporteSeleccionado: string = '';
  rangoSeleccionado: string = '';
  idProducto: number | null = null;
  opcionSeleccionada!: number;
  tiendaSeleccionada!: number;

  datosHeader = [
    { titulo: 'Reportes generales', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  reportes = [
    { id: '1', opcion: 'Patrones de venta' },
    { id: '2', opcion: 'Ventas de productos' },
    { id: '3', opcion: 'Registro de devoluciones' }
  ]

  rangoDeTiempo = [
    { id: '1', opcion: 'Mensual' },
    { id: '2', opcion: 'Anual' },
  ]

  tiendas: Tienda[] = [];

  productosVendidos: ReporteProducto[] = [];
  //productosMenosVendidos: ReporteProducto[] = [];
  devoluciones: ReporteDevolucion[] = [];
  ventas: ReportePatron[] = [];

  constructor(private cookie: CookieService, private servicioReportes: ServicioReportesService,
    private tiendaService: TiendasService) { }

  ngOnInit(): void {
    if (this.idUser === 1) {
      this.obtenerTiendas()
    } else {
      this.idTienda = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);
      this.tiendaSeleccionada = this.idTienda;
    }
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
          this.tiendaSeleccionada = this.idTienda || this.tiendaSeleccionada;
          this.cargarVentas();
          this.generarGraficaVentas();
        }
        break;
      case '2':
        if (this.idUser !== 1 || (this.tiendaSeleccionada && this.opcionSeleccionada)) {
          this.tiendaSeleccionada = this.idTienda || this.tiendaSeleccionada;
          console.log(this.tiendaSeleccionada);
          this.cargarVendidos();
          this.generarGraficaProductosVendidos();
        }
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
  generarGraficaProductosVendidos() {
    const nombres = this.productosVendidos.map(producto => producto.nombreProducto);
    const cantidades = this.productosVendidos.map(producto => producto.totalCantidadVendida);
    this.chart = new Chart(this.lineChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: nombres,
        datasets: [{
          label: 'Productos vendidos',
          data: cantidades,
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
      labels: [], // Etiquetas de los productos con más devoluciones
      datasets: [{
        label: 'Número de Devoluciones',
        data: [], // Datos de devoluciones por producto
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

  obtenerTiendas() {
    this.tiendaService.getTienda(this.cookie.get('Token')).subscribe({
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

  cargarVendidos(): void {//cambiar el 1 por el id de tienda seleccionado
    this.servicioReportes.productosVendidosPorTienda(this.cookie.get('Token'), this.opcionSeleccionada, this.tiendaSeleccionada).subscribe({
      next: (data: ReporteProducto[]) => {
        console.log(data);
        this.productosVendidos = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  cargarVentas(): void {
    this.servicioReportes.getReportesTienda(this.cookie.get('Token'), this.tiendaSeleccionada).subscribe({
      next: (data: ReportePatron[]) => {
        this.ventas = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    }
    );
  }

  cargarDevoluciones() {

  }

  generarPDF() {
    let tituloReporte!: string;
    switch (this.reporteSeleccionado) {
      case '1':
        tituloReporte = 'Patrones de venta';
        break;
      case '2':
        tituloReporte = 'Ventas de productos';
        break;
      case '3':
        tituloReporte = 'Registro devoluciones';
        break;
      default:
        tituloReporte = '???';
        break;
    }

    const pdf = new jsPDF('p', 'mm', 'a4'); // PDF formato A4
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const headerHeight = 30; // Altura del encabezado

    // **1. Encabezado: Título y Logo**
    const logoURL = '/Stock-Master-Solutions_-SMS-/assets/StockMasterAdminLogo2.png'; // URL del logo
    const title = `Reporte de ${tituloReporte}`;

    // Establece el título
    pdf.setFontSize(14);
    pdf.setTextColor(40);
    pdf.text(title, margin, margin + 10); // Título en la esquina superior izquierda

    // Añadir el logo, asegurándose de ajustarlo bien
    pdf.addImage(logoURL, 'PNG', pageWidth - 40, margin, 30, 20); // Logo ajustado

    // **2. Gráfica**
    const graphElement = this.lineChartCanvas.nativeElement; // Obtén la referencia al canvas
    if (graphElement) {
      html2canvas(graphElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const graphHeight = 80; // Altura máxima de la gráfica
        const graphWidth = (canvas.width * graphHeight) / canvas.height;

        pdf.addImage(imgData, 'PNG', margin, headerHeight + 10, graphWidth, graphHeight);

        // **3. Tabla**
        const tableElement = document.getElementById('tabla-pdf'); // ID de la tabla
        if (tableElement) {
          html2canvas(tableElement).then((canvasTable) => {
            const tableData = canvasTable.toDataURL('image/png');
            const tableHeight = 90;
            const tableWidth = (canvasTable.width * tableHeight) / canvasTable.height;

            pdf.addImage(
              tableData,
              'PNG',
              margin,
              headerHeight + 10 + graphHeight + 10,
              tableWidth,
              tableHeight
            );

            // **4. Footer: Página adicional con texto**
            pdf.addPage(); // Crear nueva página para el footer
            const footerText = 'Este es un reporte generado automáticamente por el sistema.';
            pdf.setFontSize(10);
            pdf.text(footerText, margin, pageHeight - margin);

            // Guardar el archivo PDF
            pdf.save('reporte.pdf');
          });
        } else {
          console.error('Elemento de la tabla no encontrado');
        }
      });
    } else {
      console.error('Elemento de la gráfica no encontrado');
    }
  }

}
