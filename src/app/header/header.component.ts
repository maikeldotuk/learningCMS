import {Component, HostListener, OnInit} from '@angular/core';

import {UserService} from '../user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit {

  password: string;
  isCollapsed = false;
  screenWidthFigure: number;


  constructor(private user: UserService) {

this.updateWidthValue();

  }

  @HostListener('window:resize') updateWidthValue(): void {
    this.screenWidthFigure = window.screen.width;

    if (this.screenWidthFigure >= 768) {

      this.isCollapsed = false;
    } else {

      this.isCollapsed = true;
    }

  }
  ngOnInit() {
  }


  login() {
    this.user.clickedLogin();
  }

  logout() {
    this.user.logout();
  }

  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }



}
