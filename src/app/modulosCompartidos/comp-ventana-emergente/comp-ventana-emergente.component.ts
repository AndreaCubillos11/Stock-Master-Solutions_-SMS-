import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'comp-ventana-emergente',
  templateUrl: './comp-ventana-emergente.component.html',
  styleUrls: ['./comp-ventana-emergente.component.css']
})
export class CompVentanaEmergenteComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() content: string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
