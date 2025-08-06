import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsElectroluxComponent } from './ns-electrolux.component';

describe('NsElectroluxComponent', () => {
  let component: NsElectroluxComponent;
  let fixture: ComponentFixture<NsElectroluxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsElectroluxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NsElectroluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
