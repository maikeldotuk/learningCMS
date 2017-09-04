import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Skillbox} from '../../skillbox.model';
import {Page} from '../../page.model';

@Component({
  selector: 'app-single-skill-box',
  templateUrl: './single-skill-box.component.html',
  styleUrls: ['./single-skill-box.component.css']
})
export class SingleSkillBoxComponent implements OnInit {

  @Input() skill: Skillbox;
  @Input() myPages: Page[];
  @Output() onSelectedSkill: EventEmitter<Skillbox>;
  isCollapsed = false;
  screenWidthFigure: number;



  constructor() {
    this.onSelectedSkill = new EventEmitter();
    this.updateWidthValue();

  }

  ngOnInit() {
  }

  onClickedSskill() {
    this.onSelectedSkill.emit(this.skill);
  }

  @HostListener('window:resize') updateWidthValue(): void {
    this.screenWidthFigure = window.screen.width;

    if (this.screenWidthFigure >= 768) {

      this.isCollapsed = false;
    } else {

      this.isCollapsed = true;
    }

  }
getStyle(): string {

  if (!(this.isCollapsed)) {

    return this.skill.getStyle();
  } else {
    const original = this.skill.getStyle();

    return original + 'Collapsed';

  }

}


}
