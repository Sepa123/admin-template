import { TestBed } from '@angular/core/testing';

import { GestionGpsService } from './gestion-gps.service';

describe('GestionGpsService', () => {
  let service: GestionGpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionGpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});