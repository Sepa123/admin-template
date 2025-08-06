import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefacturaDiariaComponent } from './prefactura-diaria.component';

describe('PrefacturaDiariaComponent', () => {
  let component: PrefacturaDiariaComponent;
  let fixture: ComponentFixture<PrefacturaDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefacturaDiariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefacturaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
