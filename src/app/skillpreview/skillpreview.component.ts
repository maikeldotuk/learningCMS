import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {UserService} from '../user.service';

@Component({
  selector: 'app-skillpreview',
  templateUrl: './skillpreview.component.html',
  styleUrls: ['./skillpreview.component.css']
})
export class SkillpreviewComponent implements OnInit {

  constructor(public globals: ServerService, private user: UserService
  ) { }

  ngOnInit() {
  }

  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }

}
