import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenRutasComponent } from './resumen-rutas.component';

describe('ResumenRutasComponent', () => {
  let component: ResumenRutasComponent;
  let fixture: ComponentFixture<ResumenRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenRutasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
