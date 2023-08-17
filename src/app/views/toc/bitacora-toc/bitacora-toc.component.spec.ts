import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraTocComponent } from './bitacora-toc.component';

describe('BitacoraTocComponent', () => {
  let component: BitacoraTocComponent;
  let fixture: ComponentFixture<BitacoraTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitacoraTocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BitacoraTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
