import {Component, OnInit} from '@angular/core';
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

  // Careful when choosing either http or https
  constructor(private route: ActivatedRoute, private server: ServerService, private http: HttpClient, private user: UserService) {

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
}
