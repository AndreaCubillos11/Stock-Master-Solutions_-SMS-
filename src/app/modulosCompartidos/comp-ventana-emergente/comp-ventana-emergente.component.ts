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
  @Input() tieneAccion?: boolean;
  @Output() close = new EventEmitter<void>();
  @Output() accion = new EventEmitter<void>();
  @Input() eventoPalabra?: string = '';

  eventoAccion() {
    this.accion?.emit();  // Emite solo si `accion` está definido
  }

  onClose() {
    this.close.emit();
  }
}
