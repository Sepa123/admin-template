import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasVigentesComponent } from './alertas-vigentes.component';

describe('AlertasVigentesComponent', () => {
  let component: AlertasVigentesComponent;
  let fixture: ComponentFixture<AlertasVigentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertasVigentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertasVigentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
