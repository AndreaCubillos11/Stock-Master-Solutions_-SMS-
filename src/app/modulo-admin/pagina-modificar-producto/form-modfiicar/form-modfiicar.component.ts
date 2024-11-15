import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../serviciosAdministradores/productos.service';
import { CompartirFilaService } from 'src/app/serviciosGenerales/compartir-fila.service';
import { Producto } from 'src/models/producto.model';
import { catchError, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'form-modfiicar',
  templateUrl: './form-modfiicar.component.html',
  styleUrls: ['./form-modfiicar.component.css']
})
export class FormModfiicarComponent implements OnInit {

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  imagenSrc: string | ArrayBuffer | null = null;
  cambiosForm: FormGroup;
  IdProducto: number | null = null;
  urlImagen!: string;

  categorias = [
    { value: 'aseo', label: 'Aseo' },
    { value: 'tecnologia', label: 'Tecnologia' },
    { value: 'comida', label: 'Comida' },
    { value: 'ropa', label: 'Ropa' },
  ]

  constructor(private form: FormBuilder, private servicio: ProductosService, private compartirServicio: CompartirFilaService, private cookies: CookieService) {
    this.cambiosForm = this.form.group({
      productoId: [null, [Validators.required, Validators.min(1)]],
      codigoBarras: [null, [Validators.required, Validators.pattern('^[0-9]{1,19}$'), Validators.maxLength(8)]],
      nombreProducto: ['', [Validators.required, Validators.minLength(1)]],
      descripcion: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      fechaIngreso: [new Date()]
    })
  }

  ngOnInit(): void {
    this.compartirServicio.selectedProducto$.subscribe(producto => {
      console.log('Producto recibido:', producto);
      if (producto) {
        this.urlImagen = producto.urlImagen 
        console.log(producto.productoId);
        this.cambiosForm.patchValue({
          productoId: producto.productoId,
          codigoBarras: producto.codigoBarras,
          nombreProducto: producto.nombreProducto,
          descripcion: producto.descripcion,
          precio: producto.precio,
          categoria: producto.categoria
        })
        this.IdProducto = producto.productoId;
      }
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
    console.log(this.cambiosForm.value());
    if (this.cambiosForm.valid) {
      const producto: Producto = { ...this.cambiosForm.value, id: this.IdProducto};
      console.log('Producto a modificar:', producto);

      this.servicio.modificarProducto(producto, this.cookies.get('Token')).subscribe({
        next: (resultado) => {
          if (resultado) {
            console.log('Producto modificado exitosamente.');
            this.openModal('Modificación exitosa',`El producto ${producto.nombreProducto} se modifico correctamente.`)
          } else {
            this.openModal('Error en la modificación',`La modificación del producto falló.`)
            console.log('La modificación del producto falló.');
          }
        },
        error: (err) => {
          this.openModal('Error',`Ocurrió un error en la modificación: ${err}`)
          console.error('Ocurrió un error en la modificación:', err);
        }
      });
    } else {
      this.openModal('Campos incorrectos',`El formulario no es válido.`)
      console.warn('El formulario no es válido');
    }
  }

  hasError(controlName: string, errorType: string){
    return this.cambiosForm.get(controlName)?.hasError(errorType) && this.cambiosForm.get(controlName)?.touched;
  }

  openModal(title: string, content: string) {
    this.modalTitle = title;
    this.modalContent = content;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}