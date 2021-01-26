# TWITTER-BACKEND-EXPRESS

This is an application similar to Twitter BUT without any user interface (front-end, client, ...), just a backend
with a well-formed and expandable API. The API adheres to REST standards with focus on completing the basic functionality.

## TECH STACKS

- Node.js
  - bcrypt
  - JSON Web Tokens
  - pg
  - nodemon
- Express.js
- PostgreSQL
- Jest
  - supertest

## SETUP

### PREREQUISITE

- Node.js<br/>
  More [info](https://nodejs.org/en/) for installation.
- PostgreSQL<br/>
  More [info](https://www.postgresql.org/docs/) for installation.

### INITIALIZATION

- Install dependencies by `npm install`
- Create two database for development and testing
- Copy the `.env.example` and rename it to `.env` or run the code below in the project root:

```sh
cp .env.example .env
```

- Be carefull to add `.env` to the `.gitignore` file
- Enter the required data from your database into `.env` file and save it!

### START

- To run the program in dev mode enter `npm run dev`, it will refresh anytime you save or change any files

### TEST

- To run the test enter `npm test`. Note that, it won't affect your developement database and can be run simultaneously
  !["Screenshot of tests"](https://github.com/alizmn/twitter-express-backend/blob/master/image/testing.png?raw=true)
