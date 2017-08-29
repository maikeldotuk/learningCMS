import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilleditorComponent } from './skilleditor.component';

describe('SkilleditorComponent', () => {
  let component: SkilleditorComponent;
  let fixture: ComponentFixture<SkilleditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkilleditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkilleditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
