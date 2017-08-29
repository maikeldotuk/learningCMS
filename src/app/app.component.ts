import {Component, OnInit} from '@angular/core';
import {User} from './user.model';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user = new User(this.http);
  ngOnInit() {}


  constructor(private http: HttpClient) {}

}
