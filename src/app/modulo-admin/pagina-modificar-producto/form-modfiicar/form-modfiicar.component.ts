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
  
  imagenSrc: string | ArrayBuffer | null = null;
  cambiosForm: FormGroup;
  //productoSeleccionado: Producto ;

  categorias = [
    { value: 'categoria1', label: 'Categoría 1' },
    { value: 'categoria2', label: 'Categoría 2' },
    { value: 'categoria3', label: 'Categoría 3' },
  ]

  constructor(private form: FormBuilder, private servicio: ProductosService) {
    this.cambiosForm = this.form.group({
      productoId: [null, Validators.required],
      codigoBarras: ['',[ Validators.required, Validators.min(1), Validators.max(10)]],
      nombreProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, Validators.required],
      categoria: ['', Validators.required],
      fechaIngreso: [new Date]
    })
  }

  cargarImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const type = file.type;
      const reader = new FileReader();

      if (type !== 'image/png' && type !== 'image/jpeg' && type !== 'image/jpg') {
        alert('Formato de imagen no soportado. Solo se permiten .png, .jpg y .jpeg.');
        this.imagenSrc = null;
        return;
      } else {
        reader.onloadend = () => {
          this.imagenSrc = reader.result;
        }
        reader.readAsDataURL(file)
      }
    }
  }
  modificar() {

  }
}
