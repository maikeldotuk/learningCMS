import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNoDataComponent } from './header-no-data.component';

describe('HeaderNoDataComponent', () => {
  let component: HeaderNoDataComponent;
  let fixture: ComponentFixture<HeaderNoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderNoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
