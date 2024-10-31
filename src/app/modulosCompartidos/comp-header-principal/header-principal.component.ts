import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.css']
})
export class HeaderPrincipalComponent {
  @Input() datosHeader: { titulo: string, tieneBoton: boolean, imagen: string, nombreImagen: string, textoBoton: string }[] = [
    {
      titulo: 'Stock Master Solutions',
      tieneBoton: false,
      imagen: '',
      nombreImagen: '',
      textoBoton: ''
    }
  ];

  get headerData() {
    return this.datosHeader[0] || {};
  }

}