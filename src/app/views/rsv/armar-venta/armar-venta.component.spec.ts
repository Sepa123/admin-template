import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmarVentaComponent } from './armar-venta.component';

describe('ArmarVentaComponent', () => {
  let component: ArmarVentaComponent;
  let fixture: ComponentFixture<ArmarVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmarVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
