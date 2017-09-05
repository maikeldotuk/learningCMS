import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';


import {UserService} from '../user.service';
import {ServerService} from '../server.service';
import {Skillbox} from '../skillbox.model';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  isSmallScreen = false;
  screenWidthFigure: number;

  constructor( private server: ServerService, private http: HttpClient, private user: UserService) {
    this.updateWidthValue();



  }

  ngOnInit() {


  }

  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }



  getSkillBoxes(): Skillbox[] {
    return this.server.getArraySkillBoxes();
  }



  getShowSkillEditor(): boolean {
    if (this.user.getLoggedStatus() === false) {
      return true;
    } else {
      return this.server.getShowSkillEditor();
    }
  }

  getShowSkillbox(): boolean {
    return this.server.getShowSkillbox();
  }

  getSkillEditorText() {
    return this.server.getShowSkillEditorText();
  }

  editorToggled(event) {
    this.server.onToogleEditor();
  }

  @HostListener('window:resize') updateWidthValue(): void {
    this.screenWidthFigure = window.screen.width;

    if (this.screenWidthFigure >= 768) {

      this.isSmallScreen = false;
    } else {

      this.isSmallScreen = true;
    }

  }

  getPaddingBottom() {
    return this.isSmallScreen === false ? '100px' : '10px';
  }
}
