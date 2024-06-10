import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesoVolumetricoComponent } from './peso-volumetrico.component';

describe('PesoVolumetricoComponent', () => {
  let component: PesoVolumetricoComponent;
  let fixture: ComponentFixture<PesoVolumetricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesoVolumetricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesoVolumetricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
