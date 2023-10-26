import { TestBed } from '@angular/core/testing';

import { AreatiService } from './areati.service';

describe('AreatiService', () => {
  let service: AreatiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreatiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
