import {HttpClient} from '@angular/common/http';

export class User  {
  server = 'https://www.maikel.uk';
  public logedin: boolean;

  constructor(private http: HttpClient) {
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
        alert('Invalid Password');
      }
    });
  }

  logout() {
    this.logedin = false;
  }
}
