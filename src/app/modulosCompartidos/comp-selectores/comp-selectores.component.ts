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

  inventarios: Inventario[] = [];

  seleccionado = false;
  tiendaSeleccionada!: number;
  inventarioSeleccionado: number | null = null;
  idUser: number = parseInt(localStorage.getItem('Rol') ?? '0', 10);

  constructor(private tiendaService: TiendasService, private inventarioService: InventariosService, private cookieService: CookieService) { }

  ngOnInit(): void {
    if (this.idUser == 1) {
      this.obtenerTiendas();
    }else{
      this.seleccionado = true;
      this.tiendaSeleccionada = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);
      this.getInventarios();
    }
  }

  seleccionTienda(event: any) {
    this.seleccionado = true;
    this.getInventarios()
    this.inventarioSeleccionado = null;
  }

  obtenerTiendas() {
    this.tiendaService.getTienda(this.cookieService.get('Token')).subscribe({
      next: (data: Tienda[]) => {
        console.log(data);
        this.tiendas = data;
        console.log()
      },
      error: (error) => {
        console.error('Error al obtener las tiendas', error);
      }
    });
  }

  getInventarios() {
    this.inventarioService.getInventariosTienda(this.cookieService.get('Token'), this.tiendaSeleccionada).subscribe((data: Inventario[]) => {
      this.inventarios = data;
    });
  }

}
