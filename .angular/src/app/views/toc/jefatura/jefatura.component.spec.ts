import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefaturaComponent } from './jefatura.component';

describe('JefaturaComponent', () => {
  let component: JefaturaComponent;
  let fixture: ComponentFixture<JefaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JefaturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JefaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
