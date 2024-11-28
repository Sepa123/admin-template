import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanTestComponent } from './scan-test.component';

describe('ScanTestComponent', () => {
  let component: ScanTestComponent;
  let fixture: ComponentFixture<ScanTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
