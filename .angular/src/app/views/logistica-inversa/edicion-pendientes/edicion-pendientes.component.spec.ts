import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionPendientesComponent } from './edicion-pendientes.component';

describe('EdicionPendientesComponent', () => {
  let component: EdicionPendientesComponent;
  let fixture: ComponentFixture<EdicionPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionPendientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicionPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
