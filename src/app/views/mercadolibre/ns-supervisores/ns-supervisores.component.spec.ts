import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsSupervisoresComponent } from './ns-supervisores.component';

describe('NsSupervisoresComponent', () => {
  let component: NsSupervisoresComponent;
  let fixture: ComponentFixture<NsSupervisoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsSupervisoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NsSupervisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
