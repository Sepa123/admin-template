import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingProductoComponent } from './tracking-producto.component';

describe('TrackingProductoComponent', () => {
  let component: TrackingProductoComponent;
  let fixture: ComponentFixture<TrackingProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
