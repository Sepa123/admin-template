import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosiblesRutasComponent } from './posibles-rutas.component';

describe('PosiblesRutasComponent', () => {
  let component: PosiblesRutasComponent;
  let fixture: ComponentFixture<PosiblesRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosiblesRutasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosiblesRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
