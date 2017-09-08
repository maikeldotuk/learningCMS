import {Component, HostListener, OnInit} from '@angular/core';

import {UserService} from '../user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit {


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
    this.shouldCollapse();
  }

  logout() {
    this.user.logout();
    this.shouldCollapse();
  }

  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }

shouldCollapse() {
    if (this.screenWidthFigure < 768) {
      this.isCollapsed = !this.isCollapsed;
    }
}

}
