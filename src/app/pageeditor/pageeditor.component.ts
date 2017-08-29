import { Component, OnInit } from '@angular/core';
import {SkillsPageGlobalsService} from "../skills-page-globals.service";
import {UserService} from '../user.service';

@Component({
  selector: 'app-pageeditor',
  templateUrl: './pageeditor.component.html',
  styleUrls: ['./pageeditor.component.css']
})
export class PageeditorComponent implements OnInit {

  constructor(  public globals: SkillsPageGlobalsService, private user: UserService
  ) { }

  ngOnInit() {
  }
  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }
}
