import { Component, Input } from '@angular/core';

@Component({
  selector: 'comp-card-stock',
  templateUrl: './comp-card-stock.component.html',
  styleUrls: ['./comp-card-stock.component.css']
})
export class CompCardStockComponent {
  @Input() tienda: string ='Nombre tienda';
}