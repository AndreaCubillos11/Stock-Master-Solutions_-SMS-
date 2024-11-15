import { Component, OnInit, Input } from '@angular/core';
import { TiendasService } from 'src/app/modulo-admin/serviciosAdministradores/tiendas.service';
import { CookieService } from 'ngx-cookie-service';
import { Tienda } from 'src/models/tienda.model';

@Component({
  selector: 'comp-card-stock',
  templateUrl: './comp-card-stock.component.html',
})
export class CompCardStockComponent implements OnInit {
  tienda!: Tienda; 
  tiendas: Tienda[] = []; 
  tiendasMostradas: Tienda[] = []; 
  tiendasPorPagina = 3; // Cantidad de tiendas por página
  indiceActual = 0; // Índice actual para rastrear qué tienda se debe mostrar
  idTiendaUsuario: number = parseInt(localStorage.getItem('IdTienda') ?? '0', 10);
  disableAnterior = true;
  disableSiguiente = false;


  constructor(
    private tiendaService: TiendasService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    // Si no hay idTiendaUsuario, obtener todas las tiendas y cargarlas en bloques de 3
    if (!this.idTiendaUsuario) {
      this.obtenerTiendas();
    } else {
      this.obtenerTienda();
    }
  }

  siguientePagina() {
    const siguienteIndice = this.indiceActual + this.tiendasPorPagina;

    // Verifica si quedan tiendas por mostrar
    if (siguienteIndice < this.tiendas.length) {
      // Agrega las siguientes 3 tiendas al array de tiendasMostradas
      const siguientesTiendas = this.tiendas.slice(siguienteIndice, siguienteIndice + this.tiendasPorPagina);
      this.tiendasMostradas = siguientesTiendas;
      this.indiceActual = siguienteIndice;
    }
    // Llamar a actualizar el estado de los botones
    this.actualizarEstadoBotones();
  }

  paginaAnterior() {
    const anteriorIndice = this.indiceActual - this.tiendasPorPagina;

    // Verifica que no se mueva fuera del array
    if (anteriorIndice >= 0) {
      this.tiendasMostradas = this.tiendas.slice(anteriorIndice, anteriorIndice + this.tiendasPorPagina);
      this.indiceActual = anteriorIndice;
    }
    // Llamar a actualizar el estado de los botones
    this.actualizarEstadoBotones();
  }

  actualizarEstadoBotones() {
    const siguienteIndice = this.indiceActual + this.tiendasPorPagina;

    // Habilita o deshabilita los botones según el estado
    this.disableAnterior = this.indiceActual <= 0;
    this.disableSiguiente = siguienteIndice >= this.tiendas.length;
  }

  obtenerTienda() {
    this.tiendaService.consultarTienda(this.cookieService.get('Token'), this.idTiendaUsuario).subscribe({
      next: (data: Tienda) => {
        this.tienda = data;
      },
      error: (error) => {
        console.error('Error al obtener la tienda', error);
      }
    });
  }

  obtenerTiendas() {
    this.tiendaService.getTienda(this.cookieService.get('Token')).subscribe({
      next: (data: Tienda[]) => {
        this.tiendas = data;
        // Inicializa el array de tiendas mostradas con las primeras 3 tiendas
        this.tiendasMostradas = this.tiendas.slice(0, this.tiendasPorPagina);
        this.indiceActual = this.tiendasPorPagina; // El siguiente índice a mostrar

        // Establece el estado de los botones
        this.actualizarEstadoBotones();
      },
      error: (error) => {
        console.error('Error al obtener las tiendas', error);
      }
    });
  }
}
