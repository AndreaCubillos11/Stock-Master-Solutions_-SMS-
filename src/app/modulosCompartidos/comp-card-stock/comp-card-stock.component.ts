import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TiendasService } from 'src/app/modulo-admin/serviciosAdministradores/tiendas.service';
import { Tienda } from 'src/models/tienda.model';

@Component({
  selector: 'comp-card-stock',
  templateUrl: './comp-card-stock.component.html',
  styleUrls: ['./comp-card-stock.component.css']
})
export class CompCardStockComponent implements OnInit {
  /* @Input() tienda: Tienda = { id: 1, tienda: '', direccion: '', telefono: 1 }; */
  tienda?: Tienda;
  idTiendaUsuario: number = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);

  constructor(private tiendaService: TiendasService, private cookieService: CookieService) { }

  ngOnInit(): void {
   /*  console.log('Tienda usuario:' + this.tiendaService);
    if (this.idTiendaUsuario) {
      this.obtenerTiendas();
    }else{

    } */
  }

  obtenerTienda() {
    this.tiendaService.consultarTienda(this.cookieService.get('Token'), this.idTiendaUsuario).subscribe({
      next: (data: Tienda) => {
        console.log(data);
        this.tienda = data;
        console.log(this.tienda)
      },
      error: (error) => {
        console.error('Error al obtener las tiendas', error);
      }
    });
  }
}
