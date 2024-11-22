import { TestBed } from '@angular/core/testing';

import { VentaOTraspasoService } from './venta-o-traspaso.service';

describe('VentaOTraspasoService', () => {
  let service: VentaOTraspasoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaOTraspasoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
