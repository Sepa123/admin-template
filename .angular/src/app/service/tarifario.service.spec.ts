import { TestBed } from '@angular/core/testing';

import { TarifarioService } from './tarifario.service';

describe('TarifarioService', () => {
  let service: TarifarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
