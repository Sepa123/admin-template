import { TestBed } from '@angular/core/testing';

import { InventarioTIService } from './inventario-ti.service';

describe('InventarioTiService', () => {
  let service: InventarioTIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioTIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
