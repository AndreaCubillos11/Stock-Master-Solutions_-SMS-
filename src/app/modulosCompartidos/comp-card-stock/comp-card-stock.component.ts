import { Component, Input , OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TiendasService } from 'src/app/modulo-admin/serviciosAdministradores/tiendas.service';
import { Tienda } from 'src/models/tienda.model';

@Component({
  selector: 'comp-card-stock',
  templateUrl: './comp-card-stock.component.html',
  styleUrls: ['./comp-card-stock.component.css']
})
export class CompCardStockComponent implements OnInit{
  //@Input() tienda: Tienda = {id:1, nombre: '', direccion:'', telefono:1};
  tiendas: Tienda[] = [];
  idTiendaUsuario: number = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);

  constructor(private tiendaService: TiendasService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.obtenerTiendas();
  }

  obtenerTiendas() {
    this.tiendaService.consultarTienda(this.cookieService.get('Token'), this.idTiendaUsuario).subscribe({
      next: (data: Tienda[]) => {
        console.log(data);
        this.tiendas = data;
        console.log(this.tiendas)
      },
      error: (error) => {
        console.error('Error al obtener las tiendas', error);
      }
    });
  }
}
