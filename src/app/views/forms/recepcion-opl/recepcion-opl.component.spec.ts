import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionOplComponent } from './recepcion-opl.component';

describe('RecepcionOplComponent', () => {
  let component: RecepcionOplComponent;
  let fixture: ComponentFixture<RecepcionOplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionOplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionOplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
