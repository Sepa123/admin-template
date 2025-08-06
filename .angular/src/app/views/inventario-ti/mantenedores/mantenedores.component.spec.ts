import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedoresComponent } from './mantenedores.component';

describe('MantenedoresComponent', () => {
  let component: MantenedoresComponent;
  let fixture: ComponentFixture<MantenedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
