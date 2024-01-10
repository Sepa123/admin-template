import { TestBed } from '@angular/core/testing';

import { LogInversaService } from './log-inversa.service';

describe('LogInversaService', () => {
  let service: LogInversaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogInversaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
