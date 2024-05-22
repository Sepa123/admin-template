import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadesDeOperacionesComponent } from './modalidades-de-operaciones.component';

describe('ModalidadesDeOperacionesComponent', () => {
  let component: ModalidadesDeOperacionesComponent;
  let fixture: ComponentFixture<ModalidadesDeOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalidadesDeOperacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalidadesDeOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
