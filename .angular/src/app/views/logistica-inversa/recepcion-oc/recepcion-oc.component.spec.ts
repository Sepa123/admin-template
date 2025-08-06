import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionOcComponent } from './recepcion-oc.component';

describe('RecepcionOcComponent', () => {
  let component: RecepcionOcComponent;
  let fixture: ComponentFixture<RecepcionOcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionOcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
