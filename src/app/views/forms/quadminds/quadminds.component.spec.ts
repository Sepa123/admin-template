import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadmindsComponent } from './quadminds.component';

describe('QuadmindsComponent', () => {
  let component: QuadmindsComponent;
  let fixture: ComponentFixture<QuadmindsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadmindsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuadmindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
