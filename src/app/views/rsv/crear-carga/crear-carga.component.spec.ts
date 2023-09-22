import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCargaComponent } from './crear-carga.component';

describe('CrearCargaComponent', () => {
  let component: CrearCargaComponent;
  let fixture: ComponentFixture<CrearCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
