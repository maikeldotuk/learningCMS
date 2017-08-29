import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillpreviewComponent } from './skillpreview.component';

describe('SkillpreviewComponent', () => {
  let component: SkillpreviewComponent;
  let fixture: ComponentFixture<SkillpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
