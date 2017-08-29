import { Component, OnInit } from '@angular/core';
import {SkillsPageGlobalsService} from '../skills-page-globals.service';
import {UserService} from '../user.service';
import {Skillbox} from "../skillbox.model";

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  constructor(public globals: SkillsPageGlobalsService, private user: UserService
  ) {
  }

  ngOnInit() {

  }



  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }



  getSkillBoxes(): Skillbox[] {
    return this.globals.getArraySkillBoxes();
}

  skillSelected(skill: Skillbox, skillIDinArray: number) {

    this.globals.onSelectSkill(skill, skillIDinArray);
  }


}
