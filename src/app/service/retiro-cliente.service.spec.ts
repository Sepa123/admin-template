import { TestBed } from '@angular/core/testing';

import { RetiroClienteService } from './retiro-cliente.service';

describe('RetiroClienteService', () => {
  let service: RetiroClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetiroClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
