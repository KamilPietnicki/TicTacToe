import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  // Game details
  gamesPlayed:  number = 0;
  gamesWon:     number = 0;
  gamesLost:    number = 0;

  // Enable routing
  constructor(private router: Router, public userService: UserService){
  }

  ngOnInit() {
  }

  play() {
    this.router.navigate(['game'])
  }

  logOut() {
    this.userService.logoutUser();
  }

}
