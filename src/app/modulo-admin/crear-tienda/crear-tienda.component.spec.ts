import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTiendaComponent } from './crear-tienda.component';

describe('CrearTiendaComponent', () => {
  let component: CrearTiendaComponent;
  let fixture: ComponentFixture<CrearTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearTiendaComponent]
    });
    fixture = TestBed.createComponent(CrearTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
