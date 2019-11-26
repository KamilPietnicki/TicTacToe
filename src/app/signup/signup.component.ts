import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-singnup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  // User credentials
  email:        string = '';
  password:     string = '';
  passwordConf: string = '';

  // Error messages
  alert: string = '';

  constructor( private userService: UserService, private router: Router) {}

  ngOnInit() {
        // Check if user exists
        if (this.userService.checkUser() != null) {
          this.router.navigate(['home']);
        } 
  }

  signup() {

    // Validate email
    if(this.userService.ValidateEmail(this.email)) {

      //check if passwords match
      if(this.password == this.passwordConf) {

        // check if password is over 8 chars
        var passwordLength = this.password.length;

        if (passwordLength >= 8) {
          // Call signup function from user service
          this.userService.signupUser(this.email, this.password, this.email);
        }

        // Password too short
        else {
          this.alert = "Password needs to be at least 8 characters long";
        }
      } 
      
      // Password not matching
      else {
        this.alert = "Passwords do not match";
      }

    } 

    // Invalid email
    else {
      this.alert = "Enter a valid e-mail address";
    }
  }

}
