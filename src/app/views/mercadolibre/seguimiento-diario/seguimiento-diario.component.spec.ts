import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoDiarioComponent } from './seguimiento-diario.component';

describe('SeguimientoDiarioComponent', () => {
  let component: SeguimientoDiarioComponent;
  let fixture: ComponentFixture<SeguimientoDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoDiarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
