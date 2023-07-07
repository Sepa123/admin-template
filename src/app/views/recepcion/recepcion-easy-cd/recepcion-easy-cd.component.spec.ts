import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionEasyCdComponent } from './recepcion-easy-cd.component';

describe('RecepcionEasyCdComponent', () => {
  let component: RecepcionEasyCdComponent;
  let fixture: ComponentFixture<RecepcionEasyCdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionEasyCdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionEasyCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
