import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsVerificadosComponent } from './ns-verificados.component';

describe('NsVerificadosComponent', () => {
  let component: NsVerificadosComponent;
  let fixture: ComponentFixture<NsVerificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsVerificadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NsVerificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
