import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifFechasEasyComponent } from './dif-fechas-easy.component';

describe('DifFechasEasyComponent', () => {
  let component: DifFechasEasyComponent;
  let fixture: ComponentFixture<DifFechasEasyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifFechasEasyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifFechasEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
