import { TestBed } from '@angular/core/testing';

import { TarifarioGeneralService } from './tarifario-general.service';

describe('TarifarioGeneralService', () => {
  let service: TarifarioGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifarioGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
