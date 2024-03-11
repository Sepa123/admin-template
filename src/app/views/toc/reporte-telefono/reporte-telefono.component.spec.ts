import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTelefonoComponent } from './reporte-telefono.component';

describe('ReporteTelefonoComponent', () => {
  let component: ReporteTelefonoComponent;
  let fixture: ComponentFixture<ReporteTelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTelefonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
