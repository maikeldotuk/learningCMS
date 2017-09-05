import {Component, Input, OnInit} from '@angular/core';
import {Skillbox} from "../skillbox.model";
import {Page} from "../page.model";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @Input() noPages: boolean;
  @Input() theSkill: Skillbox;
  @Input() thePages: Page[];

  constructor() {
  }

  ngOnInit() {
  }

  getStyle() {
    switch (this.theSkill.skillLevel) {
      case 'Familiar': {
        return 'item list-group-item-info';
      }
      case 'Learning': {
        return 'list-group-item-success';
      }
      case 'Queued': {
        return 'list-group-item-warning';
      }

    }
  }

}
