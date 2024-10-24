import { Component } from '@angular/core';
import { Tienda } from 'src/models/tienda.model';
import { Inventario } from 'src/models/inventario.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'comp-selectores',
  templateUrl: './comp-selectores.component.html',
  styleUrls: ['./comp-selectores.component.css'],
  animations: [
    trigger('transformPanel', [
      state('done', style({ transform: 'translateY(0)' })),
      transition('* => done', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class CompSelectoresComponent {
  tiendas: Tienda[] = [
    {id: 1, name: 'Tienda A'},
    {id: 2, name: 'Tienda B'},
  ];

  inventarios: Inventario[] = [
    {id: 1, name: 'Inventario ROPA', alertas: 4},
    {id: 2, name: 'Inventario ALIMENTOS', alertas: 8},
  ];

  seleccionado = false;
  inventarioSeleccionado: string | null = null;

  seleccionTienda(event: any) {
    this.seleccionado = true;
    this.inventarioSeleccionado = null;
  }
}
