import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEntregaDiariaComponent } from './reporte-entrega.diaria.component';

describe('ReporteEntregaDiariaComponent', () => {
  let component: ReporteEntregaDiariaComponent;
  let fixture: ComponentFixture<ReporteEntregaDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEntregaDiariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteEntregaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
