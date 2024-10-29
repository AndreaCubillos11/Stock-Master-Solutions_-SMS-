import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'comp-header-gestion',
  templateUrl: './comp-header-gestion.component.html',
  styleUrls: ['./comp-header-gestion.component.css']
})
export class CompHeaderGestionComponent implements OnInit{
  rol: number | null = null;

  constructor(){}

  ngOnInit(): void {
    this.rol = this.getRol();
  }

  getRol(): number | null {
    const rolJSON = localStorage.getItem('Rol');
    if (rolJSON) {
      const rol = JSON.parse(rolJSON);
      return parseInt(rol, 10);
    }
    return null;
  }

}
