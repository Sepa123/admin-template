import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitacionesComponent } from './citaciones.component';

describe('CitacionesComponent', () => {
  let component: CitacionesComponent;
  let fixture: ComponentFixture<CitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
