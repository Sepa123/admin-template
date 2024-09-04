import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAdelantoComponent } from './productos-adelanto.component';

describe('ProductosAdelantoComponent', () => {
  let component: ProductosAdelantoComponent;
  let fixture: ComponentFixture<ProductosAdelantoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosAdelantoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosAdelantoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
