# PharmaFlix

This project is built with Angular version 19.1.1 using the [Angular CLI](https://github.com/angular/angular-cli). It leverages standalone components, rather than using NgModules, for a more modular and modern approach to Angular development.

Additionally, JSON Server is utilized to create mock REST APIs for simulating backend interactions, making it easier to develop and test frontend functionality without the need for a real server.

This project integrates PrimeNG to enhance the UI.

## Development server

From the command line, at the root of the project run the following command:

```bash
json-server --watch db.json
```

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
