import { Component, OnInit } from '@angular/core';
import {SkillsPageGlobalsService} from "../skills-page-globals.service";
import {UserService} from '../user.service';

@Component({
  selector: 'app-skilleditor',
  templateUrl: './skilleditor.component.html',
  styleUrls: ['./skilleditor.component.css']
})
export class SkilleditorComponent implements OnInit {

  constructor(  private globals: SkillsPageGlobalsService, private user: UserService
  ) { }

  ngOnInit() {
  }

}
