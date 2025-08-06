import { TestBed } from '@angular/core/testing';

import { NombreRutaService } from './nombre-ruta.service';

describe('NombreRutaService', () => {
  let service: NombreRutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NombreRutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
