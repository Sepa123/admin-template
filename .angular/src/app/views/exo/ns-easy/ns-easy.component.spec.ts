import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsEasyComponent } from './ns-easy.component';

describe('NsEasyComponent', () => {
  let component: NsEasyComponent;
  let fixture: ComponentFixture<NsEasyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsEasyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NsEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
