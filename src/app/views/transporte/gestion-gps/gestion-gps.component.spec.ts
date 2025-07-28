import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGpsComponent } from './gestion-gps.component';

describe('GestionGpsComponent', () => {
  let component: GestionGpsComponent;
  let fixture: ComponentFixture<GestionGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionGpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});