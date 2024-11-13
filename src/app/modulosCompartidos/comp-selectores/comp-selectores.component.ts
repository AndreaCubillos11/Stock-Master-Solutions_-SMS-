import { Component, OnInit} from '@angular/core';
import { TiendasService } from 'src/app/modulo-admin/serviciosAdministradores/tiendas.service';
import { InventariosService } from 'src/app/modulo-admin/serviciosAdministradores/inventarios.service';
import { CookieService } from 'ngx-cookie-service';
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
export class CompSelectoresComponent implements OnInit{
  tiendas: Tienda[] = [
    /* { id: 1, name: 'Tienda A' },
    { id: 2, name: 'Tienda B' }, */
  ];

  inventarios: Inventario[] = [
    /* {
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
    } */
  ];

  seleccionado = false;
  tiendaSeleccionada!: number;
  inventarioSeleccionado: number | null = null;

  constructor(private tiendaService: TiendasService, private inventarioService: InventariosService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.obtenerTiendas();
  }

  seleccionTienda(event: any) {
    this.seleccionado = true;
    this.inventarioSeleccionado = null;
  }

  obtenerTiendas() {
    this.tiendaService.getTienda(this.cookieService.get('Token')).subscribe({
      next: (data: Tienda[]) => {
        console.log(data);
        this.tiendas = data;
        this.getInventarios()
        console.log()
      },
      error: (error) => {
        console.error('Error al obtener las tiendas', error);
      }
    });
  }

  getInventarios() {//Quitar el 55 en los parametros y poner el id de tienda del usuario
    this.inventarioService.getInventariosTienda(this.cookieService.get('Token'), this.tiendaSeleccionada).subscribe((data: Inventario[]) => {
      this.inventarios = data;
    });
  }

}
