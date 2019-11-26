import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

  alert: string = "";

  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  human = "X";
  cpu   = "O";

  // 0 = cpu, 1 = human
  turn    = 0;
  gameEnd = false;

  human_moves = [];
  cpu_moves = [];

  winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Enable routing
  constructor(private router: Router){
  }

  ngOnInit() {
    this.cpuMove();
  }

  checkWin(human_moves: number[], cpu_moves: number[]) {
    // Check is at least 3 moves have been made
    if (human_moves.length >= 3 || cpu_moves.length >= 3) {

      // Loop through win combinations
      for (let index = 0; index < this.winCombos.length; index++) {
        const combo = this.winCombos[index];
        
        // Check CPU moves
        if (this.turn == 0) {

          if (cpu_moves.length > 3) {
            // Checks smaller array agains bigger array
            if (combo.every(elem => cpu_moves.indexOf(elem) > -1)) {
              this.endGame(0);
              return false;
            } 
          } else {
            // Checks smaller array agains bigger array
            if (cpu_moves.every(elem => combo.indexOf(elem) > -1)) {
              this.endGame(0);
              return false;
            } 
          }

        }

        // Check human moves
        else {
          if (human_moves.length > 3) {
            // Checks smaller array agains bigger array
            if (combo.every(elem => human_moves.indexOf(elem) > -1)) {
              this.endGame(1);
              return false;
            } 
          } else {
            // Checks smaller array agains bigger array
            if (human_moves.every(elem => combo.indexOf(elem) > -1)) {
              this.endGame(1);
              return false;
            } 
          }
        }

      }
    }
  }

  cpuMove() {
    this.turn = 0;

    // Pick a random spot from the board
    var move = this.board[Math.floor(Math.random()*this.board.length)];
    this.makeMove(move);
  }

  playerMove(id: number) {
    this.turn = 1;

    // Check if cell is taken
    if (this.board.includes(id)) {
      this.makeMove(id)
    } else {
      console.log('Cell is taken');
    }

  }

  makeMove(move: number) {
    // Mark spot as taken
    var index = this.board.indexOf(move);
    if (index > -1) {
      this.board.splice(index, 1);
    };

    // Register move on board
    var target = document.getElementById(move.toString());

    if (this.turn == 0) {
      target.innerText = this.cpu;
      this.cpu_moves.push(move);
    } else {
      target.innerText = this.human;
      this.human_moves.push(move);
    }

    // Check for win
    this.checkWin(this.human_moves, this.cpu_moves);

    // Next turn
    if (!this.gameEnd && this.turn == 1) {
      this.cpuMove();
    }

    // check for draw
    if (!this.gameEnd && this.board.length == 0) {
      this.endGame(3);
    }
  }

  endGame(winner: number) {

    if (winner == 0) {
      this.alert = "You Lose"
      this.gameEnd = true;
    } 
    
    else if (winner == 1) {
      this.alert = "You Win"
      this.gameEnd = true;
    }

    else {
      this.alert = "Draw"
      this.gameEnd = true;
    }

  }

  restart() {
    // Clear Board
    var cells = document.getElementsByClassName('cell');
    [].forEach.call(cells, function(el) {
      el.innerText = "";
    });

    // Reset variables
    this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.turn    = 0;
    this.gameEnd = false;
  
    this.human_moves = [];
    this.cpu_moves = [];


    // Alert
    this.alert = "";

    // Start game
    this.cpuMove();
  }

  goHome() {
    this.router.navigate(['home'])
  }
}
