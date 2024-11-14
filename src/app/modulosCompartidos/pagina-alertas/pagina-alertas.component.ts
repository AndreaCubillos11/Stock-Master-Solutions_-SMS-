import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServicioAlertasService } from 'src/app/serviciosGenerales/servicio-alertas.service';
import { Alerta } from 'src/models/alerta.model';

@Component({
  selector: 'app-pagina-alertas',
  templateUrl: './pagina-alertas.component.html',
  styleUrls: ['./pagina-alertas.component.css']
})
export class PaginaAlertasComponent implements OnInit {
  datosHeader = [
    { titulo: 'Alertas Inventarios', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  alertas: Alerta[] = [
    {
      id: 1,
      inventarioId: 101,
      fechaAlerta: new Date('2024-11-01'),
      descripcion: 'Stock bajo',
      estado: 'Pendiente',
      tiendaId: 1,
      productoId: 1001
  },
  {
      id: 2,
      inventarioId: 101,
      fechaAlerta: new Date('2024-11-05'),
      descripcion: 'Producto dañado',
      estado: 'Resuelto',
      tiendaId: 2,
      productoId: 1002
  },
  {
      id: 3,
      inventarioId: 101,
      fechaAlerta: new Date('2024-11-10'),
      descripcion: 'Revisión de caducidad',
      estado: 'Pendiente',
      tiendaId: 1,
      productoId: 1003
  }
  ];

  groupedAlerts: Array<{ inventarioId: number; alertas: Alerta[] }> = [];

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  idSeleccionado!:number;
  eventoPalabra: string = 'Ir a modificar stock'

  constructor(private alertasService: ServicioAlertasService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.getAlertas();
    this.groupAlertsByInventory();
  }

  // Método para agrupar alertas por inventarioId
  groupAlertsByInventory(): void {
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

  getAlertClass(alertas: number): string {
    switch (true) {
      case (alertas > 5):
        return 'alertaAlta';
      case (alertas > 4):
        return 'alertaMediaAlta';
      case (alertas > 3):
        return 'alertaMedia';
      case (alertas > 2):
        return 'alertaMediaBaja';
      default:
        return 'alertaBaja';
    }
  }

  getAlertas() {
    this.alertasService.getAlertas(this.cookieService.get('Token')).subscribe((data: Alerta[]) => {
      this.alertas = data;
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
