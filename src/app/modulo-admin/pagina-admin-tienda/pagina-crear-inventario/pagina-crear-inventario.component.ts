import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventario } from 'src/models/inventario.model';
import { InventariosService } from '../../serviciosAdministradores/inventarios.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pagina-crear-inventario',
  templateUrl: './pagina-crear-inventario.component.html',
  styleUrls: ['./pagina-crear-inventario.component.css']
})
export class PaginaCrearInventarioComponent {

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  imagenSrc: string | ArrayBuffer | null = null;
  formInventario: FormGroup;

  datosHeader = [
    { titulo: 'Crear inventario', tieneBoton: true, imagen: 'volver.svg', nombreImagen: 'volver', textoBoton: 'Volver' },
  ];

  inventarios = [
    { value: '1', label: 'Aseo' },
    { value: '2', label: 'Tecnologia' },
    { value: '3', label: 'Comida' },
    { value: '4', label: 'Ropa' },
  ]

  constructor(private form: FormBuilder, private inventariosService: InventariosService, private cookies: CookieService) {
    this.formInventario = this.form.group({
      IdInventario: [null, [Validators.required, Validators.min(1)]],
      productoId: [null, [Validators.required, Validators.min(1)]],
      tiendaId: [null, [Validators.required, Validators.min(1)]],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      cantidadMinima: [null, [Validators.required, Validators.min(1)]],
      cantidadBodega: [null, [Validators.required, Validators.min(1)]],
      ubicacionTienda: ['', [Validators.required, Validators.min(1)]],
      fechaUltimaActualizacion: [new Date()],
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

  agregar() {
    if (this.formInventario.valid) {
      const nuevoInventario: Inventario = this.formInventario.value;
      this.inventariosService.agregarInventario(this.cookies.get('Token'), nuevoInventario).subscribe((resultado: boolean) => {
        if (resultado) {
          console.log('Inventario añadido exitosamente');
          this.openModal('Creado exitosamente',`El inventario se creo correctamente con ${nuevoInventario.productoId}`)
        } else {
          console.log('Error al añadir el inventario');
          this.openModal('Error al crear el inventario',`Ocurrio un error, Porfavor intenta de nuevo mas tarde`)
        }
      });
    }

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
