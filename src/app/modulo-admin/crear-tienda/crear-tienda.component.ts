import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TiendasService } from '../serviciosAdministradores/tiendas.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-crear-tienda',
  templateUrl: './crear-tienda.component.html',
  styleUrls: ['./crear-tienda.component.css']
})
export class CrearTiendaComponent {
  tiendaForm: any = this.formBuilder.group({
    idTienda:0,
    tienda:'',
    direccion:'',
    telefono:0
  });

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private tiendasService: TiendasService,
    private cookieService:CookieService
  ) { }

  nuevaTienda() {
    this.tiendasService.nuevaTienda(this.cookieService.get('Token'), this.tiendaForm.value).subscribe(
      () => {
        this.modalTitle = '';
        this.modalContent = 'La tienda ha sido guardada exitosamente';
        this.isModalOpen = true;
        setTimeout(() => {
          this.router.navigateByUrl('/gestionAdminG');
        }, 2000); // 2000 milisegundos = 2 segundos
      },
      (error) => {
        this.modalTitle = '';
        this.modalContent = 'Hubo un problema al registrar la tienda. Intente de nuevo.';
        this.isModalOpen = true;
      }
    );
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
