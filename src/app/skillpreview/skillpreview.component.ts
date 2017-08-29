import { Component, OnInit } from '@angular/core';
import {SkillsPageGlobalsService} from "../skills-page-globals.service";
import {UserService} from '../user.service';

@Component({
  selector: 'app-skillpreview',
  templateUrl: './skillpreview.component.html',
  styleUrls: ['./skillpreview.component.css']
})
export class SkillpreviewComponent implements OnInit {

  constructor(  public globals: SkillsPageGlobalsService, private user: UserService
  ) { }

  ngOnInit() {
  }

  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }

}
