import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../serviciosAdministradores/usuarios.service';
import { TiendasService } from '../serviciosAdministradores/tiendas.service';
import { ToastrService } from 'ngx-toastr';
import { Tienda } from 'src/models/tienda.model';

@Component({
  selector: 'crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  usuarioForm: any= this.formBuilder.group({
    usuarioId:0,
    nombreUsuario:'',
    contraseña:'',
    nombreCompleto:'',
    rol:0,
    correoElectronico:'',
    fechaCreacion:[new Date()],
    tiendaId:0
  }) 
  
  lisTienda:any=[];
  
  constructor(private formBuilder:FormBuilder, 
    private router:Router,
    private gestionarUsuariosService:UsuariosService,
    private toastr:ToastrService,
    private tiendasService:TiendasService
  ){}
  
  ngOnInit(){
      this.listaTienda(); // Llama al método para cargar las tiendas
  }
  
  nuevoUsuario(){
    this.gestionarUsuariosService.nuevoUsuario("to",this.usuarioForm.value).subscribe(
      ()=>{this.newMessage('Registro exitoso');
      }
    );
  }
  
  newMessage(messageText:string){
    this.toastr.success('',messageText)
  }
  
  listaTienda(){
    this.tiendasService.getTienda("tok").subscribe(
      (data:{})=>{this.lisTienda=data}
    );
  }
}
