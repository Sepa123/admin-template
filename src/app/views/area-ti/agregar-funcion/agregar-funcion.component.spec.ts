import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFuncionComponent } from './agregar-funcion.component';

describe('AgregarFuncionComponent', () => {
  let component: AgregarFuncionComponent;
  let fixture: ComponentFixture<AgregarFuncionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarFuncionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarFuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
