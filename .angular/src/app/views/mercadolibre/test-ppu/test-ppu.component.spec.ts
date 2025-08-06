import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPPUComponent } from './test-ppu.component';

describe('TestPPUComponent', () => {
  let component: TestPPUComponent;
  let fixture: ComponentFixture<TestPPUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPPUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPPUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
