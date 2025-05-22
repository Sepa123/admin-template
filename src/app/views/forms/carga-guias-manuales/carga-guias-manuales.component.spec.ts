import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaGuiasManualesComponent } from './carga-guias-manuales.component';

describe('CargaGuiasManualesComponent', () => {
  let component: CargaGuiasManualesComponent;
  let fixture: ComponentFixture<CargaGuiasManualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaGuiasManualesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaGuiasManualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
