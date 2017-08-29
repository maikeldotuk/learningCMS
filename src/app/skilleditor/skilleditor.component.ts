import { Component, OnInit } from '@angular/core';
import {SkillsPageGlobalsService} from '../skills-page-globals.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-skilleditor',
  templateUrl: './skilleditor.component.html',
  styleUrls: ['./skilleditor.component.css']
})
export class SkilleditorComponent implements OnInit {

  constructor( public globals: SkillsPageGlobalsService, private user: UserService
  ) { }

  ngOnInit() {
  }

  getFieldSkillTitle(): string{
  return this.globals.fieldSkillTitle;
  }
  getFieldLogoURL(): string {
    return this.globals.fieldLogoURL;
  }
  isModify(): boolean {
    return this.globals.isModify;
  }

  addPageToSkill() {
    this.globals.addPageToSkill();
  }

  getFieldMasteryLevel(): string {
    return this.globals.fieldMasteryLevel;
  }


  disableAddSkillButton(): boolean {
  return this.globals.disableAddSkillButton;
  }


  onCreateSkill() {
  this.globals.onCreateSkill();
  }

  onAmendSkill() {
  this.globals.onAmendSkill();
  }
  onClearFields() {
  this.globals.onClearFields();
  }

}
