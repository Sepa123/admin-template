import { TestBed } from '@angular/core/testing';

import { ModalidadDeOperacionesService } from './modalidad-de-operaciones.service';

describe('ModalidadDeOperacionesService', () => {
  let service: ModalidadDeOperacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalidadDeOperacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
