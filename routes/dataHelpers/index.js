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

  return {
    jwtGenerate,
    jwtDecode,
  };
};
