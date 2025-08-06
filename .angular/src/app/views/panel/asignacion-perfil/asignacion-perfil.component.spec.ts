import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionPerfilComponent } from './asignacion-perfil.component';

describe('AsignacionPerfilComponent', () => {
  let component: AsignacionPerfilComponent;
  let fixture: ComponentFixture<AsignacionPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
