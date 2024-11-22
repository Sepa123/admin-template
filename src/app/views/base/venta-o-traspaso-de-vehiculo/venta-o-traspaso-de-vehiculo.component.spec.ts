import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaOTraspasoDeVehiculoComponent } from './venta-o-traspaso-de-vehiculo.component';

describe('VentaOTraspasoDeVehiculoComponent', () => {
  let component: VentaOTraspasoDeVehiculoComponent;
  let fixture: ComponentFixture<VentaOTraspasoDeVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaOTraspasoDeVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaOTraspasoDeVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
