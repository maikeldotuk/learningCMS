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
  isCollapsed = false;
  screenWidthFigure: number;

  constructor(private route: ActivatedRoute, private server: ServerService, private http: HttpClient, private user: UserService) {
    this.updateWidthValue();

    route.params.subscribe(params => {
      const addressSkill = params['skill'];
      const addressPage = params['page'];
      if (!addressSkill || !addressPage) {
        this.server.clearPageFields();
      } else {
        this.server.passPage(addressSkill, addressPage);
      }
    });

  }

  ngOnInit() {


  }

  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }

  isPreviewEnabled(): boolean {
    return this.server.showPreview();
  }

  getIsPageEnabled(): boolean {
    return this.server.getIsPageEnabled();
  }

  getSkillBoxes(): Skillbox[] {
    return this.server.getArraySkillBoxes();
  }

  onSkillSelected(skillNumber: number) {
    this.server.selectedSkillFromArray(skillNumber);
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

      this.isCollapsed = false;
    } else {

      this.isCollapsed = true;
    }

  }

  getPaddingBottom() {
    return this.isCollapsed === false ? '100px' : '10px';
  }
}
