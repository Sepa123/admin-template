import { TestBed } from '@angular/core/testing';

import { CitacionesService } from './citaciones.service';

describe('CitacionesService', () => {
  let service: CitacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
