import { TestBed } from '@angular/core/testing';

import { MeliService } from './meli.service';

describe('MeliService', () => {
  let service: MeliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
