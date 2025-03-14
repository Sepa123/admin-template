import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeUsuarioYMantencionComponent } from './gestion-de-usuario-y-mantencion.component';

describe('GestionDeUsuarioYMantencionComponent', () => {
  let component: GestionDeUsuarioYMantencionComponent;
  let fixture: ComponentFixture<GestionDeUsuarioYMantencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDeUsuarioYMantencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDeUsuarioYMantencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
