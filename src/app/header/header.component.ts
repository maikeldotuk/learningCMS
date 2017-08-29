import {Component, OnInit, Input} from '@angular/core';
import {User} from '../user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user: User;
  password: string;


  constructor() {

  }

  ngOnInit() {
  }


  login() {
    swal({
      title: 'Introduce the Password',
      input: 'password',
      imageUrl: 'favicon.ico',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-primary',
      confirmButtonText: 'Let me In',
    }).then(data => {
      if (!data) {
        swal({
          title: 'Password can\'t be blank',
          type: 'error',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-primary',
          confirmButtonText: 'Try Again'
        });
        return;
      } else {
      this.user.login(data);
      }
    });
  }
}
