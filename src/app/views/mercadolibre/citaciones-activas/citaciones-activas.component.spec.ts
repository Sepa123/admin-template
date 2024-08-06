import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitacionesActivasComponent } from './citaciones-activas.component';

describe('CitacionesActivasComponent', () => {
  let component: CitacionesActivasComponent;
  let fixture: ComponentFixture<CitacionesActivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitacionesActivasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitacionesActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
