import { TestBed } from '@angular/core/testing';

import { GestionyMantencionService } from './gestiony-mantencion.service';

describe('GestionyMantencionService', () => {
  let service: GestionyMantencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionyMantencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
