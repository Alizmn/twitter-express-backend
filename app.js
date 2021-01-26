const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// import PostgreSQL
const db = require("./db");

// dbHelpers is consist of some functions to separate database querry from the logic
const dbHelpers = require("./models")(db);
// dataHelpers is consist of some functions for manipulating data
const dataHelpers = require("./routes/dataHelpers")();

const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const signinRouter = require("./routes/signin");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/signup", signupRouter({ ...dbHelpers, ...dataHelpers }));
app.use("/api/signin", signinRouter({ ...dbHelpers, ...dataHelpers }));

module.exports = app;
