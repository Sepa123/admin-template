import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifarioGeneralComponent } from './tarifario-general.component';

describe('TarifarioGeneralComponent', () => {
  let component: TarifarioGeneralComponent;
  let fixture: ComponentFixture<TarifarioGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifarioGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifarioGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
