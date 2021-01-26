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

## HIERARCHY

```bash
-__tests__          <--- test scripts using jest
-bin
-db
  -config
  -schema           <--- the database scheme and tables
  -seeds            <--- initial values for database
  index.js          <--- it would run the database server
  reset.js          <--- it would reset the database
-models             <--- refered as dbHelpers, is a set of function
-routes                                       for separating querry from the logic
  -dataHelpers      <--- a set of functions to manipulate the data
  -index            <---|
  -signin           <---|-- api routes
  -signup           <---|
```

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
  !["Screenshot of run"](https://github.com/alizmn/twitter-express-backend/blob/master/image/run.png?raw=true)
- If you need to reset database in development mode you can run `npm run db:reset`

### TEST

- To run the test enter `npm test`. Note that, it won't affect your developement database and can be run simultaneously
  !["Screenshot of tests"](https://github.com/alizmn/twitter-express-backend/blob/master/image/testing.png?raw=true)
- Everytime you run the test, it would reset the test database

### ROUTES

Currently there are two active routes:

- `/api/signup`<br/>
  Sign up is for registering new user and accept an object with username and password. For example:

```javascript
{
  username: "John",
  password: "VeryComplexPassword"
}
```

As a response, you can expect status of `200 OK` if it is succesful or and detailed error message. Also it provides a token which by default is valid for 1 hour and keep you loged in. Example of successful response:

```javascript
{
  msg: "Created successfully",
  id: 24,
  username: "John",
  password: "$2b$10$CYFOa1SvGtPPvawzRsZitO.NEZOLpFyeW0k.lH/SDqMtAIFHx7Fai",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFtaXIzMDAyMDAwMCIsImlhdCI6MTYxMTY5OTcxNywiZXhwIjoxNjExNzAzMzE3fQ.Rjpc9wpjXvHIlNwBAZOtNUZl4XeEBCxCA288L7ns-is"
}
```

The token, should be provided in the header, as an `Authorization` attribute in order to be recognized.

- `/api/signin`<br/>
  Sign in would accept a valid username and password as an object (same as sign up) and provides appropriate response. A successful response would be like:

```javascript
{
  msg: "Login successful",
  id: 24,
  username: "John",
  password: "$2b$10$CYFOa1SvGtPPvawzRsZitO.NEZOLpFyeW0k.lH/SDqMtAIFHx7Fai",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFtaXIzMDAyMDAwMCIsImlhdCI6MTYxMTcwMDA0NCwiZXhwIjoxNjExNzAzNjQ0fQ.rHL48VDVIZyxxDW5yNvHFGWasQmerza-zF0W7e2TFiM"
}
```

## FEATURES

✔️ User registration using unique username and a password
✔️ User login (Including session maintenance by jwt)
✔️ Unit tests
