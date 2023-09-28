import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioSucursalesComponent } from './inventario-sucursales.component';

describe('InventarioSucursalesComponent', () => {
  let component: InventarioSucursalesComponent;
  let fixture: ComponentFixture<InventarioSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioSucursalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
