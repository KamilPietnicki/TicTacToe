import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  // User credentials
  email:    string = '';
  password: string = '';

  // Error messages
  alert: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
  }

  login() {
    // Call singin function from user service
    this.userService.signinUser(this.email, this.password);

    if (this.userService.checkUser() != null) {
      this.router.navigate(['home']);
    } else {
      this.loginFailed();
    }
  }

  loginFailed() {
    this.alert = "Cannot find an account with that e-mail address";
  }

  signUp() {
    this.router.navigate(['signup']);
  }

}
