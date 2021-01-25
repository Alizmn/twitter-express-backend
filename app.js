const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./db");
const dbHelpers = require("./models")(db);
const dataHelpers = require("./routes/dataHelpers")();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const signupRouter = require("./routes/signup");
const signinRouter = require("./routes/signin");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter({ ...dbHelpers, ...dataHelpers }));
app.use("/api/signup", signupRouter({ ...dbHelpers, ...dataHelpers }));
app.use("/api/signin", signinRouter({ ...dbHelpers, ...dataHelpers }));

module.exports = app;
