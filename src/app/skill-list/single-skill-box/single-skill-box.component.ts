import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Skillbox} from '../../skillbox.model';
import {Page} from '../../page.model';

@Component({
  selector: 'app-single-skill-box',
  templateUrl: './single-skill-box.component.html',
  styleUrls: ['./single-skill-box.component.css']
})
export class SingleSkillBoxComponent implements OnInit {
@Input() skill: Skillbox;

  @Input('skillPages') myPages: Page[];
  @Output() onSelectedSkill: EventEmitter<Skillbox>;



  constructor() {
    this.onSelectedSkill = new EventEmitter();

  }

  ngOnInit() {
  }

  onClickedSskill() {
    this.onSelectedSkill.emit(this.skill);
  }

}
