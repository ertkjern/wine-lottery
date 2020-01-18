![GCRE](src/assets/images/tiny-logo.png)


![build badge](https://github.com/ertkjern/wine-lottery/workflows/Node%20CI/badge.svg)

# WineLottery

This is a web application to draw winners of a wine lottery in real time.
A live version of the application can be found here: https://vinlotteriet.no

Register to create a new wine lottery or join an existing lottery. 

The project can be used for any types of lotteries. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Installation

Clone the project and run `npm install` in the project folder. 
When installation is complete, run `npm start`. You  need to setup Firebase before it can be used, see next section for more information.

## Firebase 

Firebase will give you both a database and authentication for free (see their own pricing model on their website when it will start costing money). When you have created a Firebase project and turned on email authentication, you can add the API keys you receive from firebase to the `environment.ts` file. 

Now you should be good to go. 

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Contribution

Fork the project.
Whenever you think the code is good. Test it and create a Pull Request to this project. 

## Build & Deploy

To build the project, run `ng build --prod`, then upload the dist folder created to wherever you want to host the project.
No automatic deploy setup, yet.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
