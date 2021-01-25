const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = ({ getByUsername, jwtGenerate }) => {
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
              jwtGenerate(user.username, (err, token) =>
                res.json({ user, token })
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
