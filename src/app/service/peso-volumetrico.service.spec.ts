import { TestBed } from '@angular/core/testing';

import { PesoVolumetricoService } from './peso-volumetrico.service';

describe('PesoVolumetricoService', () => {
  let service: PesoVolumetricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesoVolumetricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
