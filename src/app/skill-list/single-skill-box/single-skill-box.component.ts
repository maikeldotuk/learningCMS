import {Component, Input, OnInit} from '@angular/core';
import {Skillbox} from '../../skillbox.model';
import {SkillsPageGlobalsService} from '../../skills-page-globals.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-single-skill-box',
  templateUrl: './single-skill-box.component.html',
  styleUrls: ['./single-skill-box.component.css']
})
export class SingleSkillBoxComponent implements OnInit {
@Input() skill: Skillbox;
  @Input('i') skillNumber: number;


  constructor(  private globals: SkillsPageGlobalsService, private user: UserService
  ) { }

  ngOnInit() {
  }

}
