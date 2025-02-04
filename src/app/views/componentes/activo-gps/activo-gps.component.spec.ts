import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoGpsComponent } from './activo-gps.component';

describe('ActivoGpsComponent', () => {
  let component: ActivoGpsComponent;
  let fixture: ComponentFixture<ActivoGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivoGpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivoGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
