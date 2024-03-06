import { TestBed } from '@angular/core/testing';

import { ReporteEntregaDiariaService } from './reporte-entrega-diaria.service';

describe('ReporteEntregaDiariaService', () => {
  let service: ReporteEntregaDiariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteEntregaDiariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
