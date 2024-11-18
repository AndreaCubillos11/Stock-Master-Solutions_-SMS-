import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductosService } from 'src/app/modulo-admin/serviciosAdministradores/productos.service';
import { ServicioAlertasService } from 'src/app/serviciosGenerales/servicio-alertas.service';
import { Alerta } from 'src/models/alerta.model';
import { Producto } from 'src/models/producto.model';

@Component({
  selector: 'app-pagina-alertas',
  templateUrl: './pagina-alertas.component.html',
  styleUrls: ['./pagina-alertas.component.css']
})
export class PaginaAlertasComponent implements OnInit {
  datosHeader = [
    { titulo: 'Alertas Inventarios', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  alertas: Alerta[] = [];

  palabrasClave = [ 
    { palabra: 'producto agotado', clase: 'alertaAlta' }, 
    { palabra: 'cantidad baja', clase: 'alertaMediaAlta' },
    { palabra: 'stock limite', clase: 'alertaMedia' }, 
    { palabra: 'stock medio', clase: 'alertaMediaBaja' },
    { palabra: 'stock alto', clase: 'alertaBaja' }
  ];

  /* groupedAlerts: Array<{ inventarioId: number; alertas: Alerta[] }> = []; */

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  idSeleccionado!:number;
  eventoPalabra: string = 'Modificar stock'
  token:string = this.cookieService.get('Token')

  constructor(private alertasService: ServicioAlertasService, private cookieService: CookieService, private router: Router
    ,private productosService: ProductosService) { 
   
  }

  ngOnInit(): void {
    this.getAlertas();
    //console.log(this.alertas);
  }



  // Método para agrupar alertas por inventarioId
 /*  groupAlertsByInventory(): void {
    if (this.alertas) {
      const groupedAlerts: { inventarioId: number; alertas: Alerta[] }[] = [];
    const alertMap = new Map<number, Alerta[]>();

    for (const alerta of this.alertas) {
      if (!alertMap.has(alerta.inventarioId)) {
        alertMap.set(alerta.inventarioId, []);
      }
      alertMap.get(alerta.inventarioId)?.push(alerta);
    }

    alertMap.forEach((alertas, inventarioId) => {
      groupedAlerts.push({ inventarioId, alertas });
    });

    this.groupedAlerts = groupedAlerts; // Guardar el resultado en la propiedad
    }
  } */

    getAlertClass(alerta: string): string {
      //console.log(alerta);
      const claveEncontrada = this.palabrasClave.find(p => alerta.includes(p.palabra.toLowerCase()));
      return claveEncontrada ? claveEncontrada.clase : 'alertaBaja';
    }

  getAlertas() {
    this.alertasService.getAlertas(this.token).subscribe((data: Alerta[]) => {
      console.log(data);
      this.alertas = data;
      this.alertas.push( {
        idAlerta: 1,
        inventarioId: 101,
        fechaAlerta: new Date('2024-11-01'),
        descripcion: 'Stock limite',
        estado: 'Pendiente',
        tiendaId: 1,
        productoId: 1001
    },
    {
        idAlerta: 2,
        inventarioId: 101,
        fechaAlerta: new Date('2024-11-05'),
        descripcion: 'Stock medio',
        estado: 'Resuelto',
        tiendaId: 2,
        productoId: 1002
    },
    {
        idAlerta: 3,
        inventarioId: 5,
        fechaAlerta: new Date('2024-11-10'),
        descripcion: 'stock alto',
        estado: 'Pendiente',
        tiendaId: 1,
        productoId: 1003
    })
      console.log(this.alertas);
      //this.groupAlertsByInventory();
    });
  }

  redirigir() {
    this.router.navigate(['/modificarCantidad'])
  }

  seleccionProducto(alerta: number){
    this.idSeleccionado = alerta;
    this.openModal('Restablecer Stock', `Se detecto cantidades bajas en el producto con id ${this.idSeleccionado}`)
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
