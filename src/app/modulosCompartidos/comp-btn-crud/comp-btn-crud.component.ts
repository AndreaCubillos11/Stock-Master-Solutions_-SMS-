import { Component, Input } from '@angular/core';

@Component({
  selector: 'comp-btn-crud',
  templateUrl: './comp-btn-crud.component.html',
  styleUrls: ['./comp-btn-crud.component.css']
})
export class CompBtnCRUDComponent {
  @Input() datosBotones: { texto: string, img: string, nombreClase: string }[] = [];
}
