import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendientesEnRutaComponent } from './pendientes-en-ruta.component';

describe('PendientesEnRutaComponent', () => {
  let component: PendientesEnRutaComponent;
  let fixture: ComponentFixture<PendientesEnRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendientesEnRutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendientesEnRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
