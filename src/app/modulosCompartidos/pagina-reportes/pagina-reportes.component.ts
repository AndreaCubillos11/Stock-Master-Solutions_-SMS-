import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { TiendasService } from 'src/app/modulo-admin/serviciosAdministradores/tiendas.service';
import { ServicioReportesService } from 'src/app/serviciosGenerales/servicio-reportes.service';
import { ReporteDevolucion } from 'src/models/reporteDevoluciones.model';
import { ReportePatron } from 'src/models/reportePatrones.model';
import { ReporteProducto } from 'src/models/reporteProductos.model';
import { Tienda } from 'src/models/tienda.model';
import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { InventariosService } from 'src/app/modulo-admin/serviciosAdministradores/inventarios.service';
import { forkJoin, map } from 'rxjs';
import { Devolucion } from 'src/models/devolucion.model';
import { ServicioDevolucionesService } from 'src/app/serviciosGenerales/servicio-devoluciones.service';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-pagina-reportes',
  templateUrl: './pagina-reportes.component.html',
  styleUrls: ['./pagina-reportes.component.css']
})
export class PaginaReportesComponent implements OnInit, OnDestroy {
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef;

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  idUser: number = parseInt(localStorage.getItem('Rol') ?? '0', 10);
  idTienda!: number;
  chart!: Chart;
  reporteSeleccionado: string = '';
  rangoSeleccionado: string = '';
  idProducto: number | null = null;
  opcionSeleccionada: boolean | null = null;
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

  tiendasConInventario: Tienda[] = [];
  tiendasConDevoluciones: Tienda[] = [];

  botonDeshabilitado: boolean = false;
  graficoCreado: boolean = false;

  productosVendidos: ReporteProducto[] = [];
  devoluciones: ReporteDevolucion[] = [];
  ventas: ReportePatron[] = [];

  constructor(private cookie: CookieService, private servicioReportes: ServicioReportesService,
    private tiendaService: TiendasService, private inventarioService: InventariosService,
    private devolucionesService: ServicioDevolucionesService) { }

  ngOnInit(): void {
    if (this.idUser === 1) {
      //this.obtenerTiendas()
      this.obtenerTiendasConInventario()
      this.obtenerTiendasConDevoluciones()
    } else {
      this.idTienda = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);
      this.tiendaSeleccionada = this.idTienda;
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  seleccionarReporte(id: string) {
    if (this.chart) {
      this.chart.destroy();
      this.botonDeshabilitado = true;
    }
    this.reporteSeleccionado = id;
    this.rangoSeleccionado = '';
    this.idProducto = null;
    this.opcionSeleccionada = null;
    this.botonDeshabilitado = false;
    this.graficoCreado = false;
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
    this.graficoCreado = false;
    this.botonDeshabilitado = true;
    // Crear un nuevo gráfico según el reporte seleccionado
    switch (this.reporteSeleccionado) {
      case '1': //Patrones de ventas
        if (this.rangoSeleccionado && !(this.idProducto == null)) {
          this.tiendaSeleccionada = this.idTienda || this.tiendaSeleccionada;
          this.cargarVentas();
          this.graficoCreado = true;
        }
        break;
      case '2': //Productos mas o menos vendidos
        if (this.idUser !== 1 || (this.tiendaSeleccionada && this.opcionSeleccionada)) {
          this.tiendaSeleccionada = this.idTienda || this.tiendaSeleccionada;
          console.log(this.tiendaSeleccionada);
          this.cargarVendidos();
          this.graficoCreado = true;
        }
        break;
      case '3': //Devoluciones
        this.cargarDevoluciones();
        this.graficoCreado = true;
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
    setTimeout(() => {
      console.log('Gráfica generada.');
      this.botonDeshabilitado = false; // Rehabilitar el botón
    }, 2000);
    //this.graficoCreado = true;
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
    //this.graficoCreado = true;
    setTimeout(() => {
      console.log('Gráfica generada.');
      this.botonDeshabilitado = false; // Rehabilitar el botón
    }, 2000);
  }
  //finGrafica

  //Inicio Grafica devolucion
  generarGraficaDevoluciones() {
    const agrupaciones = this.devoluciones.reduce((acc, devolucion) => {
      acc[devolucion.productoID] = (acc[devolucion.productoID] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // Obtener los labels (productoId) y data (cantidades de devoluciones)
    const labels = Object.keys(agrupaciones).map(id => `Producto id ${id}`);
    const data = Object.values(agrupaciones);
    const chartData: ChartData = {
      labels, // Etiquetas de los productos con más devoluciones
      datasets: [{
        label: 'Número de Devoluciones',
        data, // Datos de devoluciones por producto
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
    setTimeout(() => {
      console.log('Gráfica generada.');
      this.botonDeshabilitado = false; // Rehabilitar el botón
    }, 2000);
    //this.graficoCreado = true;
  }
  //Fin Grafica Devolucion

  obtenerDatosAgrupados() {
    const labels: string[] = [];
    const values: number[] = [];

    switch (this.rangoSeleccionado) {
      case '1':
        // Agrupación mensual: suma ventas por día
        const ventasPorDia = this.ventas.reduce((acc, ventas) => {
          // Convertir fechaMovimiento a Date si no es un objeto Date
          const fecha = new Date(ventas.fechaMovimiento).toLocaleDateString();
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
          const mes = new Date(ventas.fechaMovimiento).getMonth() + 1; // Convertir a Date aquí también
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

  obtenerTiendasConInventario() {
    this.tiendaService.getTienda(this.cookie.get('Token')).subscribe({
      next: (tiendas: Tienda[]) => {
        console.log('Tiendas obtenidas:', tiendas);
        this.tiendas = tiendas;

        // Creamos un array de observables para todas las tiendas
        const observables = tiendas.map((tienda) =>
          this.inventarioService.getInventariosTienda(this.cookie.get('Token'), tienda.id).pipe(
            map((inventarios) => ({ tienda, tieneInventario: inventarios.length > 0 }))
          )
        );

        // Ejecutamos todas las solicitudes en paralelo
        forkJoin(observables).subscribe({
          next: (resultados) => {
            // Filtramos las tiendas que tienen inventarios
            this.tiendasConInventario = resultados
              .filter((resultado) => resultado.tieneInventario)
              .map((resultado) => resultado.tienda);

            console.log('Tiendas con inventario:', this.tiendasConInventario);
          },
          error: (error) => {
            console.error('Error al verificar inventarios:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener las tiendas:', error);
      }
    });
  }

  obtenerTiendasConDevoluciones() {
    this.tiendaService.getTienda(this.cookie.get('Token')).subscribe({
      next: (tiendas: Tienda[]) => {
        this.tiendas = tiendas;

        // Obtener todas las devoluciones una sola vez
        this.devolucionesService.getAllDevoluciones(this.cookie.get('Token')).subscribe({
          next: (devoluciones: Devolucion[]) => {
            console.log('Devoluciones obtenidas:', devoluciones);

            // Filtrar devoluciones por tienda
            const observables = tiendas.map((tienda) => {
              const devolucionesTienda = devoluciones.filter(
                (devolucion) => devolucion.tiendaID === tienda.id
              );

              //console.log(`Devoluciones de la tienda ${tienda.id}:`, devolucionesTienda);

              return {
                tienda,
                tieneDevoluciones: devolucionesTienda.length > 0,
              };
            });

            // Filtrar las tiendas que tienen devoluciones
            this.tiendasConDevoluciones = observables
              .filter((resultado) => resultado.tieneDevoluciones)
              .map((resultado) => resultado.tienda);

            console.log('Tiendas con devoluciones:', this.tiendasConDevoluciones);
          },
          error: (error) => {
            console.error('Error al obtener devoluciones:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error al obtener las tiendas:', error);
      },
    });
  }

  cargarVendidos(): void {
    let opcion: number;
    if (this.opcionSeleccionada) {
      opcion = 1;
    } else {
      opcion = 2;
    }
    this.servicioReportes.productosVendidosPorTienda(this.cookie.get('Token'), opcion, this.tiendaSeleccionada).subscribe({
      next: (data: ReporteProducto[]) => {
        if (data && data.length > 0) {  
          this.productosVendidos = data;
          this.generarGraficaProductosVendidos();
        } else {
          this.openModal('Sin productos', 'No se encotraron productos vendidos en la tienda');
          this.botonDeshabilitado = false;
          this.graficoCreado = false;
        }
      },
      error: (error) => {
        this.openModal('Error', `${error}`)
      }
    })
  }

  cargarVentas(): void {
    this.servicioReportes.getReportesTienda(this.cookie.get('Token'), this.tiendaSeleccionada).subscribe({
      next: (data: ReportePatron[]) => {
        if (data && data.length > 0) {
          this.ventas = data;
          this.generarGraficaVentas();
        } else {
          this.openModal('Sin productos', 'No se encotraron productos vendidos en la tienda');
          this.botonDeshabilitado = false;
          this.graficoCreado = false;
        }
      },
      error: (error) => {
        this.openModal('Error', `${error}`)
      },
    }
    );
  }

  cargarDevoluciones() {
    this.servicioReportes.getReporteDevolucion(this.cookie.get('Token'), this.tiendaSeleccionada).subscribe({
      next: (data: ReporteDevolucion[]) => {
        if (data && data.length > 0) {
          this.devoluciones = data;
          this.generarGraficaDevoluciones();
        } else {
          this.openModal('Sin devolciones', 'No se encotraron devoluciones registradas');
          this.botonDeshabilitado = false;
          this.graficoCreado = false;
        }
      },
      error: (error) => {
        this.openModal('Error', `${error}`)
      }
    })
  }

  generarPDF() {
    const pdf = new jsPDF('p', 'mm', 'a4'); // PDF formato A4
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const headerHeight = 30; // Altura del encabezado
    const footerHeight = 20; // Altura del pie de página
    const tableStartY = headerHeight + 20;
    let head: any;
    let data: any;
    let tituloReporte!: string;

    switch (this.reporteSeleccionado) {
      case '1':
        tituloReporte = 'Patrones de venta';
        head = Object.keys(this.ventas[0]);
        console.log(head);

        data = this.ventas.map(v => [
          v.productoId,          // Producto ID
          v.tiendaId,            // Tienda ID
          v.cantidad,            // Cantidad
          new Date(v.fechaMovimiento).toLocaleDateString(),
          v.tiendaId
        ]);
        console.log(data);

        break;
      case '2':
        head = Object.keys(this.productosVendidos[0]);
        data = this.productosVendidos.map(p => [
          p.productoId,          //
          p.totalCantidadVendida,
          p.nombreProducto
        ]);
        tituloReporte = 'Ventas de productos';
        break;
      case '3':
        head = Object.keys(this.devoluciones[0]);
        data = this.devoluciones.map(d => [
          d.productoID,
          d.fechaDevolucion,
          d.razon
        ]);
        tituloReporte = 'Registro devoluciones';
        break;
      default:
        tituloReporte = '???';
        break;
    }

    // **1. Encabezado: Título y Logo**
    const logoURL = '/Stock-Master-Solutions_-SMS-/assets/StockMasterAdminLogo2.png'; // URL del logo
    const title = `Reporte de ${tituloReporte}`;

    // Establecer el color de fondo del encabezado
    pdf.setFillColor(74, 31, 67); // Color #4A1F43
    pdf.rect(0, 0, pageWidth, headerHeight, 'F'); // Fondo del encabezado

    // Establecer la fuente del encabezado
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(23);
    pdf.setTextColor(255, 255, 255); // Color blanco para el texto
    pdf.text(title, margin, margin + 10); // Título en la esquina superior izquierda

    // Añadir el logo
    const img = new Image();
    img.onload = () => {
      const logoWidth = 30; // Ancho del logo
      const logoHeight = (img.height * logoWidth) / img.width; // Mantener proporciones del logo
      pdf.addImage(img, 'PNG', pageWidth - logoWidth, 0, logoWidth, logoHeight); // Añadir el logo correctamente

      // **2. Gráfica**
      const graphElement = this.lineChartCanvas.nativeElement; // Obtén la referencia al canvas
      if (graphElement) {
        // Aumentar la calidad de la imagen exportada
        const scale = 3; // Factor de escala para mejorar la resolución
        htmlToImage.toPng(graphElement, {
          canvasWidth: graphElement.width * scale,
          canvasHeight: graphElement.height * scale
        })
          .then((imgData: string) => {
            const graphHeight = 80; // Altura máxima de la gráfica
            const graphWidth = (graphElement.width * graphHeight) / graphElement.height;

            // Agregar la imagen de la gráfica con una resolución más alta
            pdf.addImage(imgData, 'PNG', margin, headerHeight + 10, graphWidth, graphHeight);

            // **3. Tabla: Añadir espaciado después de la gráfica**
            const tableStartYWithSpacing = tableStartY + graphHeight + 10; // Espaciado adicional

            // Generar la tabla
            autoTable(pdf, {
              startY: tableStartYWithSpacing, // Nueva posición Y para la tabla
              head: [head],
              body: data,
              theme: 'grid',
              margin: { top: 10, left: 10, right: 10 },
            });

            // **4. Footer: Personalizado con fondo y texto centrado**
            const footerText = 'Este es un reporte generado automáticamente por el sistema.';
            pdf.setFillColor(74, 31, 67); // Color #4A1F43
            pdf.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, 'F'); // Fondo del pie de página
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(15);
            pdf.setTextColor(255, 255, 255); // Color blanco para el texto
            pdf.text(footerText, pageWidth / 2, pageHeight - (footerHeight / 2), { align: 'center' });

            // Guardar el archivo PDF
            pdf.save('reporte.pdf');
          });
      } else {
        console.error('Elemento de la gráfica no encontrado');
      }
    };
    img.src = logoURL; // Cargar la imagen del logo
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
