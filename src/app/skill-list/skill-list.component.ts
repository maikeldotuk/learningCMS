import { Component, OnInit } from '@angular/core';
import {SkillsPageGlobalsService} from "../skills-page-globals.service";
import {UserService} from '../user.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  constructor(  private globals: SkillsPageGlobalsService, private user: UserService
  ) { }

  ngOnInit() {
  }

}
