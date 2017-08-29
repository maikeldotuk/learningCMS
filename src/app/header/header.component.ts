import {Component, OnInit} from '@angular/core';

import {UserService} from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  password: string;


  constructor(private user: UserService) {

  }

  ngOnInit() {
  }


  login() {
    this.user.clickedLogin();
  }

  logout() {
    this.user.logout();
  }

}
