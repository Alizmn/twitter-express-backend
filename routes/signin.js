const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = ({ getByUsername }) => {
  router.post("/", function (req, res) {
    const loginInfo = {
      username: req.body.username,
      password: req.body.password,
    };
    getByUsername(loginInfo.username).then((user) => {
      if (user) {
        bcrypt
          .compare(loginInfo.password, user.password)
          .then((result) => {
            if (result) {
              // res.json({ msg: `Correct username password` });
              const payload = { username: user.username };
              jwt.sign(
                payload,
                process.env.jwtSecret,
                { expiresIn: "1h" },
                (err, token) =>
                  res.json({ msg: `Correct username password`, token })
              );
            } else {
              res.json({ msg: "Wrong username OR password " });
            }
          })
          .catch((err) => res.send(err));
      } else {
        res.json({ msg: "Wrong username OR password " });
      }
    });
  });
  return router;
};
