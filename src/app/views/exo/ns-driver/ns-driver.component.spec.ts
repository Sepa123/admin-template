import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsDriverComponent } from './ns-driver.component';

describe('NsDriverComponent', () => {
  let component: NsDriverComponent;
  let fixture: ComponentFixture<NsDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NsDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
