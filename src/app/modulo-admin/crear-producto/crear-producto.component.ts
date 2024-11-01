import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../serviciosAdministradores/productos.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CargarImagenServiceService } from '../serviciosAdministradores/cargar-imagen-service.service';





@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})


export class CrearProductoComponent {
  productoForm: FormGroup;

  files: File[] = [];

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  constructor(
    private productosServices: ProductosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private http: HttpClient,
    private uploadService:CargarImagenServiceService,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {
    // Inicializar el formulario
    this.productoForm = this.formBuilder.group({
      productoId: 0,
      nombreProducto: '',
      descripcion: '',
      codigoBarras: 0,
      categoria: '',
      precio: 0,
      urlImage: '',
      fechaIngreso: [new Date()], // Establece la fecha y hora actual como valor inicial
    });
  }


  onSelect(event: any) {

    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {

    this.files.splice(this.files.indexOf(event), 1);
  }

  upload(): Promise<string | null> {
    if (this.files.length === 0) return Promise.resolve(null);
  
    const file_Data = this.files[0];
    const data = new FormData();
    data.append('file', file_Data);
    data.append('upload_preset', 'Tiendas Dione');
    data.append('cloud_name', 'dfaqsp0j1');
  
    return new Promise((resolve, reject) => {
      this.uploadService.uploadImg(data).subscribe({
        next: (response) => {
          const url = response.secure_url;
          this.productoForm.get('urlImage')?.setValue(url); // Establece la URL correcta en el formulario
          this.cdr.detectChanges();
          resolve(url); // Devuelve la URL de la imagen subida
        },
        error: (e) => {
          console.error(e);
          reject(null); // En caso de error, devuelve null
          this.modalTitle = '';
            this.modalContent = 'Hubo un problema al registrar el producto. Intente de nuevo.';
            this.isModalOpen = true;
        }
      });
    });
  }
  
  async nuevoProducto() {
    try {
      const imageUrl = await this.upload();
      if (imageUrl) {
        console.log(this.productoForm.value);
        this.productosServices.nuevoProducto(this.cookieService.get('Token'), this.productoForm.value).subscribe(
          () => {
            this.modalTitle = '';
            this.modalContent = 'El producto se ha agregado exitosamente';
            this.isModalOpen = true;
          },
          (error) => {
            this.modalTitle = '';
            this.modalContent = 'Hubo un problema al registrar el producto. Intente de nuevo.';
            this.isModalOpen = true;
          }
        );
      } else {
        this.toastr.error("No se pudo cargar la imagen, intente nuevamente.");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
