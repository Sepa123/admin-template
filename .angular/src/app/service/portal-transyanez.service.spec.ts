import { TestBed } from '@angular/core/testing';

import { PortalTransyanezService } from './portal-transyanez.service';

describe('PortalTransyanezService', () => {
  let service: PortalTransyanezService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortalTransyanezService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
