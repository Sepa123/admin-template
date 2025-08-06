import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionElectroluxComponent } from './recepcion-electrolux.component';

describe('RecepcionElectroluxComponent', () => {
  let component: RecepcionElectroluxComponent;
  let fixture: ComponentFixture<RecepcionElectroluxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionElectroluxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionElectroluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
