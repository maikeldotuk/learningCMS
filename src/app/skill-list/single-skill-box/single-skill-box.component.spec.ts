import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSkillBoxComponent } from './single-skill-box.component';

describe('SingleSkillBoxComponent', () => {
  let component: SingleSkillBoxComponent;
  let fixture: ComponentFixture<SingleSkillBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSkillBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSkillBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
