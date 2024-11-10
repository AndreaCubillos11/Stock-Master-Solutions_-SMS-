import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCantidadComponent } from './modificar-cantidad.component';

describe('ModificarCantidadComponent', () => {
  let component: ModificarCantidadComponent;
  let fixture: ComponentFixture<ModificarCantidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarCantidadComponent]
    });
    fixture = TestBed.createComponent(ModificarCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
