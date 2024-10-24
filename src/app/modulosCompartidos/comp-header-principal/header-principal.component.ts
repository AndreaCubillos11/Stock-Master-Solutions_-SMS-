import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.css']
})
export class HeaderPrincipalComponent  {
  @Input() titulo: string ='Stock Master Solutions';
  @Input() tieneBoton: boolean = false;
  @Input() imagen: string = '';
  @Input() nombreImagen: string = '';
  @Input() textoBoton: string = '';

}
