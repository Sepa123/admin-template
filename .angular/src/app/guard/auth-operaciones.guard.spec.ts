import { TestBed } from '@angular/core/testing';

import { AuthOperacionesGuard } from './auth-operaciones.guard';

describe('AuthOperacionesGuard', () => {
  let guard: AuthOperacionesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthOperacionesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
