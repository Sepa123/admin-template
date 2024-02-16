import { TestBed } from '@angular/core/testing';

import { VidaProductoService } from './vida-producto.service';

describe('VidaProductoService', () => {
  let service: VidaProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VidaProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
