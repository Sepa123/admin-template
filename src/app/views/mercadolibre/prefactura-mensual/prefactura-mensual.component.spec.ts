import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefacturaMensualComponent } from './prefactura-mensual.component';

describe('PrefacturaMensualComponent', () => {
  let component: PrefacturaMensualComponent;
  let fixture: ComponentFixture<PrefacturaMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefacturaMensualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefacturaMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
