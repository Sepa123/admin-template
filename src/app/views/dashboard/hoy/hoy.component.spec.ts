import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoyComponent } from './hoy.component';

describe('HoyComponent', () => {
  let component: HoyComponent;
  let fixture: ComponentFixture<HoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
