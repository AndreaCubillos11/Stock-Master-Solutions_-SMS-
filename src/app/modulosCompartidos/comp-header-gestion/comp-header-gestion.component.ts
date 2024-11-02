import { Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
 
@Component({
  selector: 'comp-header-gestion',
  templateUrl: './comp-header-gestion.component.html',
  styleUrls: ['./comp-header-gestion.component.css']
})
export class CompHeaderGestionComponent implements OnInit{
  rol: number | null = null;
 
  isModalOpen: boolean = false;
  modalTitle: string = 'Sesion cerrada';
  modalContent: string = 'Su sesion fue terminada exitosamente';
 
  openModal(title: string, content: string) {
    this.modalTitle = title;
    this.modalContent = content;
    this.isModalOpen = true;
  }
 
  closeModal() {
    this.isModalOpen = false;
  }
 
  constructor(private cookie: CookieService, private router: Router){}
 
  ngOnInit(): void {
    this.rol = this.getRol();
    console.log(this.rol)
  }
 
  getRol(): number | null {
    const rol = localStorage.getItem('Rol');
    return rol ? parseInt(rol,10) : null;
  }
 
  logout() {
    this.openModal(this.modalTitle, this.modalContent)
    this.cookie.delete('Token', '/');
    localStorage.removeItem('Rol');
    this.router.navigate(['']);
   
  }
 
}
 