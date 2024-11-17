import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InventariosService } from 'src/app/modulo-admin/serviciosAdministradores/inventarios.service';
import { Inventario } from 'src/models/inventario.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-empleado',
  templateUrl: './pagina-empleado.component.html',
  styleUrls: ['./pagina-empleado.component.css']
})
export class PaginaEmpleadoComponent implements OnInit {

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  datosTabla = [
    {
      datos: [] as Inventario[],
      seleccionable: false,
    }
  ];

  inventarios: Inventario[] = [];

  datosError: Inventario[] = [ 
    {
      idInventario: 0,
      productoId: 0,
      tiendaId: 0,
      cantidad: 0,
      cantidadMinima: 0,
      fechaUltimaActualizacion: new Date(),
      cantidadBodega: 0,
      ubicacionTienda: 'No disponible'
    }
  ];
  

  datosBtn = [
    { texto: 'Agregar devolucion', img: 'Añadir.svg', nombreClase: 'agregar', accion: this.agregarDevolucion.bind(this) },
    { texto: 'Modificar cantidad de inventario', img: 'ModificarInventario.svg', nombreClase: 'modificar', accion: this.modificarInventario.bind(this) },
  ];

  idTienda!: number;

  constructor(private inventarioService: InventariosService, private cookieService: CookieService, private router: Router,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.idTienda = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);
    this.getInventarios();
  }

  agregarDevolucion() {
    console.log('Agregar devolucion');
    this.router.navigate(['/devoluciones']);
  }

  modificarInventario() {
    console.log('Modificar inventario');
    this.router.navigate(['/modificarCantidad']);
  }

  simularVenta() {
    console.log('Simular ventas');
    this.router.navigate(['/simularVenta']);
  }

  getInventarios() {
    this.inventarioService.getInventariosTienda(this.cookieService.get('Token'), this.idTienda).subscribe({
      next: (data: Inventario[]) => {
        if (data && data.length > 0) {
          console.log(data);
          this.inventarios = data;
          this.datosTabla[0].datos = data;
          this.datosTabla = [{
            ...this.datosTabla[0],
            datos: [...data]
          }]
          console.log(this.datosTabla[0].datos)
          this.cd.detectChanges();
        }else{
          console.log('No hay datos');
          /* this.datosTabla[0].datos = this.datosError;
          this.datosTabla = [{
            ...this.datosTabla[0],
            datos: [...this.datosError]
          }]
          console.log(this.datosTabla[0].datos)
          this.cd.detectChanges(); */
          this.openModal('Sin datos', `No existen inventarios creados para su tienda, porfavor comuniquese con su administrador`)
        }

      },
      error: (error) => {
        console.error('Error inventarios', error);
        this.openModal('Error al obtener inventarios', error)
      }
    });
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
