import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user: User;
  password: string;
  colorPassField = 'white';
placeholderText = "Password";

  constructor() {

  }

  ngOnInit() {
  }

  login() {
    if (!this.password) {
      this.colorPassField = '#ffb3b3';
      this.placeholderText = "Can't be blank";
      return;
    }
    this.user.login(this.password);
    this.password = "";
  }

  onChangeColorPassField() {
    this.colorPassField = 'white';
    this.placeholderText = "Password";
  }

}
