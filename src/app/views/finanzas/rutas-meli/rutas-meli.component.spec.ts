import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasMeliComponent } from './rutas-meli.component';

describe('RutasMeliComponent', () => {
  let component: RutasMeliComponent;
  let fixture: ComponentFixture<RutasMeliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutasMeliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutasMeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
