import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosOldComponent } from './estados-old.component';

describe('EstadosOldComponent', () => {
  let component: EstadosOldComponent;
  let fixture: ComponentFixture<EstadosOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosOldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
