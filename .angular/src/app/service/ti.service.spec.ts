import { TestBed } from '@angular/core/testing';

import { TIService } from './ti.service';

describe('TIService', () => {
  let service: TIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
