const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = () => {
  const jwtGenerate = (username, callBack) => {
    return jwt.sign(
      { username },
      process.env.jwtSecret,
      {
        expiresIn: process.env.jwtExpire,
      },
      (err, token) => callBack(err, token)
    );
  };

  const jwtDecode = (req) => {
    if (req.header("Authorization")) {
      const token = req.header("Authorization");
      return jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if (err) {
          return { err, username: null };
        } else {
          return { err: null, username: decoded.username };
        }
      });
    } else {
      return { err: "no token provided, please login", username: null };
    }
  };

  const alert = (response, statusCode = 200, message, data) => {
    const msg = [
      "Login successful",
      "You are already logged in! If you want to use another account please signout first.",
      "Wrong username OR password",
      "Please enter a value for username/password",
      "Username already in use",
      "Created successfully",
    ];
    if (data && (message || message === 0)) {
      return response.status(statusCode).json({ msg: msg[message], ...data });
    } else if (!message) {
      return response.status(statusCode).json({ ...data });
    } else {
      return response.status(statusCode).json({ msg: msg[message] });
    }
  };

  return {
    jwtGenerate,
    jwtDecode,
    alert,
  };
};
