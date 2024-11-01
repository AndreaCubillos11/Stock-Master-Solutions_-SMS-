import { TestBed } from '@angular/core/testing';

import { CargarImagenServiceService } from './cargar-imagen-service.service';

describe('CargarImagenServiceService', () => {
  let service: CargarImagenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarImagenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
