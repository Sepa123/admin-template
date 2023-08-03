import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaQuadmindComponent } from './carga-quadmind.component';

describe('CargaQuadmindComponent', () => {
  let component: CargaQuadmindComponent;
  let fixture: ComponentFixture<CargaQuadmindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaQuadmindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaQuadmindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
