import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarSkuComponent } from './buscar-sku.component';

describe('BuscarSkuComponent', () => {
  let component: BuscarSkuComponent;
  let fixture: ComponentFixture<BuscarSkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarSkuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
