import { TestBed } from '@angular/core/testing';

import { DefontanaApiService } from './defontana-api.service';

describe('DefontanaApiService', () => {
  let service: DefontanaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefontanaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
