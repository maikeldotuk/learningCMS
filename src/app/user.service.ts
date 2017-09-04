import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable()
export class UserService {
  server: string;
  public logedin: boolean;

  constructor(private http: HttpClient, @Inject('SERVER_URL') server: string) {
    this.server = server;
    this.logedin = true;
  }

  getLoggedStatus() {
    return this.logedin;
  }


  login(password: string) {

    const address = this.server + '/api/v1/user/' + password;
    let results;
    this.http.get(address).subscribe(data => {
      // Read the result field from the JSON response.
      results = data;
      if (results.password === 'true') {
        this.logedin = true;
      } else {
        swal({
          title:"Wrong Password!",
          imageUrl: "https://media.tenor.com/images/aee72fd7530ce5deae7209ffe6df76c0/tenor.gif",
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-primary',
          confirmButtonText: 'Try Again',
        });
      }
    });
  }

  logout() {
    this.logedin = false;
  }

  clickedLogin() {
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
        this.login(data);
      }
    });
  }
}
