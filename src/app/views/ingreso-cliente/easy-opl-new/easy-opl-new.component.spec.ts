import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyOplNewComponent } from './easy-opl-new.component';

describe('EasyOplNewComponent', () => {
  let component: EasyOplNewComponent;
  let fixture: ComponentFixture<EasyOplNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyOplNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyOplNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
