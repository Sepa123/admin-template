import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitacionSupervisoresComponent } from './citacion-supervisores.component';

describe('CitacionSupervisoresComponent', () => {
  let component: CitacionSupervisoresComponent;
  let fixture: ComponentFixture<CitacionSupervisoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitacionSupervisoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitacionSupervisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
