import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagina-modificar-producto',
  templateUrl: './pagina-modificar-producto.component.html',
  styleUrls: ['./pagina-modificar-producto.component.css']
})
export class PaginaModificarProductoComponent {
  datosHeader = [
    { titulo: 'Modificar productos', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver'},
  ];


  cambiosForm: FormGroup;

  constructor(private form: FormBuilder) {
    this.cambiosForm = this.form.group({
      nombreProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      
    })
  }

}
