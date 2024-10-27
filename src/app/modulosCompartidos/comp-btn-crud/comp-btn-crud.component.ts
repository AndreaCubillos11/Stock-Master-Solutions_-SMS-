import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'comp-btn-crud',
  templateUrl: './comp-btn-crud.component.html',
  styleUrls: ['./comp-btn-crud.component.css']
})
export class CompBtnCRUDComponent {
  @Input() datosBotones: { texto: string, img: string, nombreClase: string, accion: () => void }[] = [];

  redirigirBtn(button: any) {
    button.accion();
  }
}
