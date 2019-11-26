import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
  }


  ngOnInit() {
    // Check if user exists
    if (this.userService.checkUser() != null) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
