import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPaquetesAbiertosComponent } from './listar-paquetes-abiertos.component';

describe('ListarPaquetesAbiertosComponent', () => {
  let component: ListarPaquetesAbiertosComponent;
  let fixture: ComponentFixture<ListarPaquetesAbiertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPaquetesAbiertosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPaquetesAbiertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
