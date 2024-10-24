import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.css']
})
export class HeaderPrincipalComponent  {
  @Input() titulo: string ='Stock Master System';
  @Input() imagen: string = 'infoIcon.svg';
  @Input() nombreImagen: string = 'Informacion';
  @Input() textoBoton: string = '';

}
