import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTarifarioEspecificoComponent } from './car-tarifario-especifico.component';

describe('CarTarifarioEspecificoComponent', () => {
  let component: CarTarifarioEspecificoComponent;
  let fixture: ComponentFixture<CarTarifarioEspecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarTarifarioEspecificoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTarifarioEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
