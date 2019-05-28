![GCRE](src/assets/images/tiny-logo.png)

# WineLottery

This is a web application to draw winners of a wine lottery in real time.
A live version of the application can be found here: https://vinlotteriet.no

Register to create a new wine lottery or join an existing lottery. The creator of the application will start the draw, and anyone with the PIN can join in and see the lottery live.

The project can basicly be used for any types of lotteries. Clone the repo to make your own.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Installation

Clone the project and run `npm install` in the project folder. 
When installation is complete, run `npm start`. You  need to setup Firebase before it can be used, see next section for more information.

## Firebase 

Firebase will give you both a database and authentication for free (for a while, see their own pricing model on their website). When you have created a Firebase project and turned on email authentication, you can add the API keys you receive from firebase to the `environment.ts` file. 

Now you should be good to go. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
