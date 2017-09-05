import {Component, Input, OnInit} from '@angular/core';
import {ServerService} from "../server.service";
import {UserService} from '../user.service';
import {Skillbox} from "../skillbox.model";
import {Page} from "../page.model";

@Component({
  selector: 'app-skillpreview',
  templateUrl: './skillpreview.component.html',
  styleUrls: ['./skillpreview.component.css']
})
export class SkillpreviewComponent implements OnInit {
@Input() theSkill: Skillbox;
@Input() thePages: Page[];
  constructor(public globals: ServerService, private user: UserService
  ) { }

  ngOnInit() {
  }

  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }

}
