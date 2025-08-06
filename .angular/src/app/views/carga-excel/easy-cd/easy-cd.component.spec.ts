import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyCdComponent } from './easy-cd.component';

describe('EasyCdComponent', () => {
  let component: EasyCdComponent;
  let fixture: ComponentFixture<EasyCdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyCdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
