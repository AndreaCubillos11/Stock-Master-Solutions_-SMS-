import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'comp-header-gestion',
  templateUrl: './comp-header-gestion.component.html',
  styleUrls: ['./comp-header-gestion.component.css']
})
export class CompHeaderGestionComponent {
  constructor(private router: Router){

  }

  cambioAlerta() {
    this.router.navigate(['/alertaInventario']);
  }
}
