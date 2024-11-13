import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pagina-devoluciones',
  templateUrl: './pagina-devoluciones.component.html',
  styleUrls: ['./pagina-devoluciones.component.css']
})
export class PaginaDevolucionesComponent {

  productName: string = 'Nombre del Producto'; // Este es el nombre que se renderiza en el h2
  estados = ['Nuevo', 'Ligeramente nuevo', 'Usado', 'Defectuoso'];
  
  datosHeader = [
    { titulo: 'Agregar Devolucion', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  formDevolucion: FormGroup;

  constructor(private form: FormBuilder, private cookies: CookieService) {
    this.formDevolucion = this.form.group({
      DevolucionID: [null, [Validators.required, Validators.min(1)]],
      ProductoID: [null, [Validators.required, Validators.min(1)]],
      TiendaID: [null, [Validators.required, Validators.min(1)]],
      UsuarioID: [null, [Validators.required, Validators.min(1)]],
      razon: ['', [Validators.required, Validators.min(1)]],
      fechaUltimaActualizacion: [new Date()],
    })
  }
}
