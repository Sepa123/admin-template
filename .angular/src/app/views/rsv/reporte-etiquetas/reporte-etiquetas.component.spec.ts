import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEtiquetasComponent } from './reporte-etiquetas.component';

describe('ReporteEtiquetasComponent', () => {
  let component: ReporteEtiquetasComponent;
  let fixture: ComponentFixture<ReporteEtiquetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEtiquetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteEtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
