import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadSinEtiquetaComponent } from './unidad-sin-etiqueta.component';

describe('UnidadSinEtiquetaComponent', () => {
  let component: UnidadSinEtiquetaComponent;
  let fixture: ComponentFixture<UnidadSinEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadSinEtiquetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadSinEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
