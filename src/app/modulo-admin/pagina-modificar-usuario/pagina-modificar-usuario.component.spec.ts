import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaModificarUsuarioComponent } from './pagina-modificar-usuario.component';

describe('PaginaModificarUsuarioComponent', () => {
  let component: PaginaModificarUsuarioComponent;
  let fixture: ComponentFixture<PaginaModificarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaModificarUsuarioComponent]
    });
    fixture = TestBed.createComponent(PaginaModificarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
