import { TestBed } from '@angular/core/testing';

import { ServicioDevolucionesService } from './servicio-devoluciones.service';

describe('ServicioDevolucionesService', () => {
  let service: ServicioDevolucionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioDevolucionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
