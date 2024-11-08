import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimularVentaComponent } from './simular-venta.component';



describe('SimularVentaComponent', () => {
  let component: SimularVentaComponent;
  let fixture: ComponentFixture<SimularVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimularVentaComponent]
    });
    fixture = TestBed.createComponent(SimularVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
