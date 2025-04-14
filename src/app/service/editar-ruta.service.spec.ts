import { TestBed } from '@angular/core/testing';

import { EditarRutaService } from './editar-ruta.service';

describe('EditarRutaService', () => {
  let service: EditarRutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarRutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});