const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = () => {
  // generating a token and accept a callback function
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
  // decoding the token to verify the user
  const jwtDecode = (req) => {
    //double-check the header to prevent request attack
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
  //easy function to handle response code and handling data for sending to the front-end
  const alert = (response, statusCode = 200, message, data) => {
    //repetetive messages are here to make the code clean and maintainable
    const msg = [
      "Login successful",
      "You are already logged in! If you want to use another account please signout first.",
      "Wrong username OR password",
      "Please enter a value for username/password",
      "Username already in use",
      "Created successfully",
      "Please log in to see your tweets",
      "No tweet yet!",
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
