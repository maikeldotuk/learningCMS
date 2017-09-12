import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebooklikeComponent } from './facebooklike.component';

describe('FacebooklikeComponent', () => {
  let component: FacebooklikeComponent;
  let fixture: ComponentFixture<FacebooklikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebooklikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebooklikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
