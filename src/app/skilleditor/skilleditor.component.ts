import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServerService} from '../server.service';
import {UserService} from '../user.service';
import {Skillbox} from "../skillbox.model";
import {Page} from "../page.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-skilleditor',
  templateUrl: './skilleditor.component.html',
  styleUrls: ['./skilleditor.component.css']
})
export class SkilleditorComponent implements OnInit {

  @Input() theSkill: Skillbox;
  @Input() moreContent: string;
  @Input() isNew: boolean;
  @Output() onAddedPage: EventEmitter<Page>;
  @Output() cancelEdit: EventEmitter<any>;

  constructor(private router: Router) {
    this.onAddedPage = new EventEmitter();
    this.cancelEdit = new EventEmitter();

  }

  ngOnInit() {
  }


  addPageToSkill() {
    const aPage = new Page('', this.moreContent, '', this.theSkill.skillTitle, new Date());
    this.onAddedPage.emit(aPage);
    this.moreContent = '';

  }

  onCancel() {

    this.cancelEdit.emit(0);

  }


}
