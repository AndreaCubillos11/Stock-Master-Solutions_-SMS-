import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  productoForm:any= this.formBuilder.group({
    productoId:0,
    nombreProducto:'',
    descripcion:'',
    codigoBarras:0,
    categoria:'',
    precio:0,
    fechaIngreso:[new Date()], // Establece la fecha y hora actual como valor inicial
  })
  
    selectedFile: File | null = null;
    imgurUrl: string | null = null;

    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }

  constructor(private productosServices: ProductosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService
  ){}

  /*uploadImageToImgur() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        const base64Data = (reader.result as string).split(',')[1];

        const headers = new HttpHeaders({
          Authorization: 'Client-ID TU_CLIENT_ID_IMGUR'
        });

        const formData = new FormData();
        formData.append('image', base64Data);

        this.http.post<any>('https://api.imgur.com/3/image', formData, { headers })
          .subscribe(response => {
            this.imgurUrl = response.data.link;
            console.log('Imagen subida a Imgur:', this.imgurUrl);
            this.nuevoProducto(); // Llama a nuevoProducto después de cargar la imagen
          });
      };
    }
  }*/

  nuevoProducto() {
    this.productosServices.nuevoProducto(this.cookieService.get('Token'), this.productoForm.value).subscribe(
      () => {
       
      }
    );
  }
}
