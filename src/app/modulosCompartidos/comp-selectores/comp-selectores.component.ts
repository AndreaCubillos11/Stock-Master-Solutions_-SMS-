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
    {
        id: 1,
        productoId: 101,
        tiendaId: 1,
        cantidad: 50,
        cantidadMinima: 10,
        cantidadBodega: 100,
        ubicacionTienda: 'Pasillo A - Estante 5',
        fechaUltimaActualizacion: new Date('2023-10-10')
    },
    {
        id: 2,
        productoId: 102,
        tiendaId: 1,
        cantidad: 30,
        cantidadMinima: 5,
        cantidadBodega: 80,
        ubicacionTienda: 'Pasillo B - Estante 2',
        fechaUltimaActualizacion: new Date('2023-10-12')
    },
    {
        id: 3,
        productoId: 103,
        tiendaId: 2,
        cantidad: 20,
        cantidadMinima: 8,
        cantidadBodega: 60,
        ubicacionTienda: 'Pasillo C - Estante 1',
        fechaUltimaActualizacion: new Date('2023-10-15')
    }
  ];

  seleccionado = false;
  inventarioSeleccionado: string | null = null;

  seleccionTienda(event: any) {
    this.seleccionado = true;
    this.inventarioSeleccionado = null;
  }
}
