import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosSinClasificacionComponent } from './productos-sin-clasificacion.component';

describe('ProductosSinClasificacionComponent', () => {
  let component: ProductosSinClasificacionComponent;
  let fixture: ComponentFixture<ProductosSinClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosSinClasificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosSinClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
