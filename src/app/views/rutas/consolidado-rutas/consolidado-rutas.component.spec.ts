import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoRutasComponent } from './consolidado-rutas.component';

describe('ConsolidadoRutasComponent', () => {
  let component: ConsolidadoRutasComponent;
  let fixture: ComponentFixture<ConsolidadoRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidadoRutasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidadoRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
