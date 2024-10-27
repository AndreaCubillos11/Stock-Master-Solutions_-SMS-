import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTiendaComponent } from './modificar-tienda.component';

describe('ModificarTiendaComponent', () => {
  let component: ModificarTiendaComponent;
  let fixture: ComponentFixture<ModificarTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarTiendaComponent]
    });
    fixture = TestBed.createComponent(ModificarTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
