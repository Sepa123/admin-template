import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTocComponent } from './editar-toc.component';

describe('EditarTocComponent', () => {
  let component: EditarTocComponent;
  let fixture: ComponentFixture<EditarTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
