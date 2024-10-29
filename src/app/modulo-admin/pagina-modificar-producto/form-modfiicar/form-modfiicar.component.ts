import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../serviciosAdministradores/productos.service';
import { Producto } from 'src/models/producto.model';

@Component({
  selector: 'form-modfiicar',
  templateUrl: './form-modfiicar.component.html',
  styleUrls: ['./form-modfiicar.component.css']
})
export class FormModfiicarComponent {
  cambiosForm: FormGroup;
  //productoSeleccionado: Producto ;

  constructor(private form: FormBuilder, private servicio: ProductosService) {
    this.cambiosForm = this.form.group({
      idProducto: [null, Validators.required],
      nombreProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, Validators.required],
      categoria: ['', Validators.required],
      codigoBarras: [null, Validators.required]
    })
  }

  modificar(){
    
  }
}
