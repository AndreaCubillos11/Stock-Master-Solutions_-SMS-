import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarInventarioComponent } from './eliminar-inventario.component';

describe('EliminarInventarioComponent', () => {
  let component: EliminarInventarioComponent;
  let fixture: ComponentFixture<EliminarInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarInventarioComponent]
    });
    fixture = TestBed.createComponent(EliminarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
