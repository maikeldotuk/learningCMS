import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageeditorComponent } from './pageeditor.component';

describe('PageeditorComponent', () => {
  let component: PageeditorComponent;
  let fixture: ComponentFixture<PageeditorComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
