import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelServicioComponent } from './nivel-servicio.component';

describe('NivelServicioComponent', () => {
  let component: NivelServicioComponent;
  let fixture: ComponentFixture<NivelServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NivelServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
