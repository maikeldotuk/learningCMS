import { Component, OnInit } from '@angular/core';
import {ServerService} from '../server.service';
import {UserService} from '../user.service';
import {Skillbox} from "../skillbox.model";

@Component({
  selector: 'app-skilleditor',
  templateUrl: './skilleditor.component.html',
  styleUrls: ['./skilleditor.component.css']
})
export class SkilleditorComponent implements OnInit {

  constructor(public globals: ServerService, private user: UserService
  ) { }

  ngOnInit() {
  }

  getFieldSkillTitle(): string{
  return this.globals.editorTitleField;
  }
  getFieldLogoURL(): string {
    return this.globals.editorLogoField;
  }
  isModify(): boolean {
    return this.globals.isExistingSkill;
  }

  addPageToSkill() {
    this.globals.addPageToSkill();
  }

  getFieldMasteryLevel(): string {
    return this.globals.editorMasteryField;
  }


  disableAddSkillButton(): boolean {
  return this.globals.editorAddModifyButtonVisible;
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
