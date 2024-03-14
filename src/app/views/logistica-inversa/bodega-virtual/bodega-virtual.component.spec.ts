import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegaVirtualComponent } from './bodega-virtual.component';

describe('BodegaVirtualComponent', () => {
  let component: BodegaVirtualComponent;
  let fixture: ComponentFixture<BodegaVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodegaVirtualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodegaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
