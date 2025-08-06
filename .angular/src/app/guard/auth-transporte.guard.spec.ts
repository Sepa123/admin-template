import { TestBed } from '@angular/core/testing';

import { AuthTransporteGuard } from './auth-transporte.guard';

describe('AuthTransporteGuard', () => {
  let guard: AuthTransporteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthTransporteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
