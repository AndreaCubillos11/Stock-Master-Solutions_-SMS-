import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.css']
})
export class HeaderPrincipalComponent implements OnInit{
  @Input() datosHeader: { titulo: string, tieneBoton: boolean, imagen: string, nombreImagen: string, textoBoton: string, accion?: () => void }[] = [
    {
      titulo: 'Stock Master Solutions',
      tieneBoton: false,
      imagen: '',
      nombreImagen: '',
      textoBoton: ''
    }
  ];

  rol!: number | null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rol = this.getRol();
  }

  getRol(): number | null {
    const rol = localStorage.getItem('Rol');
    return rol ? parseInt(rol,10) : null;
  }

  get headerData() {
    return this.datosHeader[0] || {};
  }

  redirigirBtn() {
    switch (this.rol) {
      case 1:
        this.router.navigate(['/gestionAdminG']);
        break;
      case 2:
        this.router.navigate(['/gestionAdminT']);
        break;
      case 3:
        this.router.navigate(['/gestionEmpleado']);
        break;
    
      default:
        this.router.navigate(['']);
        break;
    }
  }

}
