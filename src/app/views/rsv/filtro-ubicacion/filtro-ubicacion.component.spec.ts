import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroUbicacionComponent } from './filtro-ubicacion.component';

describe('FiltroUbicacionComponent', () => {
  let component: FiltroUbicacionComponent;
  let fixture: ComponentFixture<FiltroUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroUbicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
