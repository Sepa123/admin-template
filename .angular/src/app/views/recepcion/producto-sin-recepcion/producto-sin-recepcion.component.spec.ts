import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoSinRecepcionComponent } from './producto-sin-recepcion.component';

describe('ProductoSinRecepcionComponent', () => {
  let component: ProductoSinRecepcionComponent;
  let fixture: ComponentFixture<ProductoSinRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoSinRecepcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoSinRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
