import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';

export class User  {
  server = 'https://www.maikel.uk';
  public logedin: boolean;

  constructor(private http: HttpClient) {
    this.logedin = false;
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
}
