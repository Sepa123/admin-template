import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrearmadoRutaComponent } from './prearmado-ruta.component';

describe('PrearmadoRutaComponent', () => {
  let component: PrearmadoRutaComponent;
  let fixture: ComponentFixture<PrearmadoRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrearmadoRutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrearmadoRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
