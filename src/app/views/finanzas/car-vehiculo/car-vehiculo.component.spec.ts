import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarVehiculoComponent } from './car-vehiculo.component';

describe('CarVehiculoComponent', () => {
  let component: CarVehiculoComponent;
  let fixture: ComponentFixture<CarVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
