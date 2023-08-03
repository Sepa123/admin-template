import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyOplComponent } from './easy-opl.component';

describe('EasyOplComponent', () => {
  let component: EasyOplComponent;
  let fixture: ComponentFixture<EasyOplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyOplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyOplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
