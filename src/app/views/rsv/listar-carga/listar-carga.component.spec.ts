import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCargaComponent } from './listar-carga.component';

describe('ListarCargaComponent', () => {
  let component: ListarCargaComponent;
  let fixture: ComponentFixture<ListarCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
