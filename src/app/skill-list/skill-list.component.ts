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

  constructor(private globals: SkillsPageGlobalsService, private user: UserService
  ) {
  }

  ngOnInit() {

  }

  showSkillBox(): boolean {
    return this.globals.showSkillBox;
  }

  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }

  onToggleEditor() {
    this.globals.onToggleEditor();
  }

  getSkillBoxes(): Skillbox[] {
    return this.globals.getArraySkillBoxes();
}
  getSkillEditorText(): string {
    return this.globals.showSkillEditorText;
  }
}
