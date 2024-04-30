import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMercadoLibreComponent } from './info-mercado-libre.component';

describe('InfoMercadoLibreComponent', () => {
  let component: InfoMercadoLibreComponent;
  let fixture: ComponentFixture<InfoMercadoLibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoMercadoLibreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoMercadoLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
