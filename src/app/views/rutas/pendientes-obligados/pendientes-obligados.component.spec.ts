import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendientesObligadosComponent } from './pendientes-obligados.component';

describe('PendientesObligadosComponent', () => {
  let component: PendientesObligadosComponent;
  let fixture: ComponentFixture<PendientesObligadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendientesObligadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendientesObligadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
