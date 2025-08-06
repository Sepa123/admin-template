import { TestBed } from '@angular/core/testing';

import { RolSaveService } from './rol-save.service';

describe('RolSaveService', () => {
  let service: RolSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
