# Tictactoe

A simple game of tic tac toe by Kamil Pietnicki

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Challanges

There were a few main challanges that I came accross when developing this app. The first and obvious one was getting familiar with Angular. I have had some experience with React before so understanding the overall nature of Angular wasn't too difficult. Most of the challange came from understanding the specifics of communicating data between components and other parts of the app.

Another big challange was understanding AWS Cognito. This is something I wasn't familiar with at all so it took me a while to try and get my head around it. I've done this by mainly looking at documentation and sample proects provided by Amazon, as well as looking at various user forums for answers on specific questions.

# Design Decisions 

The biggest design decision that I made during the development process was deciding on how I will build the actual tic tac toe game, and how I will implement the oponent AI.

Initially I decided that the easiest way to do it was to find an existing tic tac toe game built in vanilla JS, and then just modify it to fit into an Angular component. However, the time and effor it took to modify all of the code to fit my curent set up seemed not to be worth the effort. This led me to just building the game myself, and using a vey primitive AI that would just pick any free cell at random. 

This reulted in all of the code being more understandable by me, which allows for very easy modification in the future.

Other than that, I tried to keep the code as modular as possible by dividing the app into seperate components, and having one user service class that would be able to easily communicate with the rest of the app to allow user authentication when needed.

# Given More Time

Given more time I would have wanted to implement the following features

- More advanced AI
- 2 player mode
- Online multiplayer
- Online leaderboards 
- Player ranks based on Elo rating