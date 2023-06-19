import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaManualComponent } from './ruta-manual.component';

describe('RutaManualComponent', () => {
  let component: RutaManualComponent;
  let fixture: ComponentFixture<RutaManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
