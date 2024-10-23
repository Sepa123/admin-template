import { TestBed } from '@angular/core/testing';

import { TarifarioEspecificoService } from './tarifario-especifico.service';

describe('TarifarioEspecificoService', () => {
  let service: TarifarioEspecificoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifarioEspecificoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
