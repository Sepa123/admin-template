import { TestBed } from '@angular/core/testing';

import { TrabajemosService } from './trabajemos.service';

describe('TrabajemosService', () => {
  let service: TrabajemosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrabajemosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
