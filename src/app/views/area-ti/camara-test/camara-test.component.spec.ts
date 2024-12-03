import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaraTestComponent } from './camara-test.component';

describe('CamaraTestComponent', () => {
  let component: CamaraTestComponent;
  let fixture: ComponentFixture<CamaraTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamaraTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamaraTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
