import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaRutasManualesComponent } from './carga-rutas-manuales.component';

describe('CargaRutasManualesComponent', () => {
  let component: CargaRutasManualesComponent;
  let fixture: ComponentFixture<CargaRutasManualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaRutasManualesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaRutasManualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
