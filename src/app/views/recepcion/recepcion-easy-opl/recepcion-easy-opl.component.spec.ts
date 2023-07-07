import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionEasyOplComponent } from './recepcion-easy-opl.component';

describe('RecepcionEasyOplComponent', () => {
  let component: RecepcionEasyOplComponent;
  let fixture: ComponentFixture<RecepcionEasyOplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionEasyOplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionEasyOplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
