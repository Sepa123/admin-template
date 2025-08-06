import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosIngresadosEasyComponent } from './productos-ingresados-easy.component';

describe('ProductosIngresadosEasyComponent', () => {
  let component: ProductosIngresadosEasyComponent;
  let fixture: ComponentFixture<ProductosIngresadosEasyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosIngresadosEasyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosIngresadosEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
