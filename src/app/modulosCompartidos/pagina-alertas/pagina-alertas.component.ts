import { Component, OnInit } from '@angular/core';
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
    /*  {
       id: 1,
       inventarioId: 1,
       fechaAlerta: new Date('2023-10-20'),
       descripcion: 'Cantidad de inventario por debajo del nivel mínimo.',
       estado: 'Pendiente'
     },
     {
       id: 2,
       inventarioId: 1,
       fechaAlerta: new Date('2023-10-22'),
       descripcion: 'Revisión de stock necesaria en la bodega.',
       estado: 'Urgente'
     },
     {
       id: 3,
       inventarioId: 2,
       fechaAlerta: new Date('2023-10-23'),
       descripcion: 'Actualización pendiente de inventario.',
       estado: 'Pendiente'
     } */
  ];

  groupedAlerts: Array<{ inventarioId: number; alertas: Alerta[] }> = [];

  constructor(private alertasService: ServicioAlertasService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.groupAlertsByInventory();
    this.getAlertas();
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

}
