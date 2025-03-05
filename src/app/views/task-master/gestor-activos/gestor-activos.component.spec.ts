import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorActivosComponent } from './gestor-activos.component';

describe('GestorActivosComponent', () => {
  let component: GestorActivosComponent;
  let fixture: ComponentFixture<GestorActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
