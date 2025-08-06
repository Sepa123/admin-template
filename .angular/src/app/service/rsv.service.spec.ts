import { TestBed } from '@angular/core/testing';

import { RsvService } from './rsv.service';

describe('RsvService', () => {
  let service: RsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
