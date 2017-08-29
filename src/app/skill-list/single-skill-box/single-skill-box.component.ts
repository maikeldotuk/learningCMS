import {Component, Input, OnInit} from '@angular/core';
import {Skillbox} from '../../skillbox.model';
import {SkillsPageGlobalsService} from '../../skills-page-globals.service';
import {UserService} from '../../user.service';
import {Page} from "../../page.model";

@Component({
  selector: 'app-single-skill-box',
  templateUrl: './single-skill-box.component.html',
  styleUrls: ['./single-skill-box.component.css']
})
export class SingleSkillBoxComponent implements OnInit {
@Input() skill: Skillbox;
  @Input('i') skillNumber: number;
  @Input('skillPages') myPages: Page[];


  constructor(  public globals: SkillsPageGlobalsService, private user: UserService
  ) { }

  ngOnInit() {
  }

}
