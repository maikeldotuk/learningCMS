import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ServerService} from '../server.service';
import {Skillbox} from '../skillbox.model';
import {Page} from '../page.model';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Input() arraySkills: Skillbox[];
  @Input() toggleButtonText: string;
  @Output() selectedSkill: EventEmitter<number>;
  @Output() emitToggleEditor: EventEmitter<any>;
  isCollapsed = false;
  screenWidthFigure: number;
   oneAtATime: boolean = true;

  constructor(private server: ServerService) {
    this.selectedSkill = new EventEmitter();
    this.emitToggleEditor = new EventEmitter();

    this.updateWidthValue();
  }

  ngOnInit() {

  }

  skillSelected(skillIDinArray: number) {
    this.selectedSkill.emit(skillIDinArray);
  }

  onToogleEditor() {
    this.emitToggleEditor.emit('Done');
  }

  getPages(skill): Page[] {
    return this.server.getPages(skill);
  }

  @HostListener('window:resize') updateWidthValue(): void {
    this.screenWidthFigure = window.screen.width;

    if (this.screenWidthFigure >= 768) {

      this.isCollapsed = false;
    } else {

      this.isCollapsed = true;
    }

  }
}
