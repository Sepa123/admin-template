import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionSportexComponent } from './recepcion-sportex.component';

describe('RecepcionSportexComponent', () => {
  let component: RecepcionSportexComponent;
  let fixture: ComponentFixture<RecepcionSportexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionSportexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionSportexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
