import { Component } from '@angular/core';
import { Inventario } from 'src/models/inventario.model';

@Component({
  selector: 'app-pagina-alertas',
  templateUrl: './pagina-alertas.component.html',
  styleUrls: ['./pagina-alertas.component.css']
})
export class PaginaAlertasComponent {
  titulo: string = 'Alertas Inventarios';
  imagen: string = 'volver.svg';
  nombreImagen: string = 'volver';
  textoBoton: string = 'Volver';

  inventarios: Inventario[] = [
    {id: 1, name: 'Inventario ROPA', alertas: 4},
    {id: 2, name: 'Inventario ALIMENTOS', alertas: 2}
  ];
  
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
  
  
}
