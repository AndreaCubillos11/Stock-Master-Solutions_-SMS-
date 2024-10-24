import { Component } from '@angular/core';
import { Inventario } from 'src/models/inventario.model';

@Component({
  selector: 'app-pagina-empleado',
  templateUrl: './pagina-empleado.component.html',
  styleUrls: ['./pagina-empleado.component.css']
})
export class PaginaEmpleadoComponent {
  inventarios: Inventario[] = [
    {id: 1, name: 'Inventario ROPA', alertas: 4},
    {id: 2, name: 'Inventario ALIMENTOS', alertas: 2},
  ];
}
