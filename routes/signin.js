const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = ({ getByUsername, jwtGenerate, jwtDecode }) => {
  router.post("/", async function (req, res) {
    if (req.header("Authorization")) {
      const verifyInfo = await jwtDecode(req);
      verifyInfo.err
        ? res.json({ msg: verifyInfo.err })
        : res.json({
            msg: `You are already logged in as ${verifyInfo.username}. If you want to use another account please signout first.`,
          });
    } else if (req.body.username && req.body.password) {
      const loginInfo = {
        username: req.body.username,
        password: req.body.password,
      };
      getByUsername(loginInfo.username)
        .then((user) => {
          if (user) {
            bcrypt
              .compare(loginInfo.password, user.password)
              .then((result) => {
                if (result) {
                  jwtGenerate(user.username, (err, token) => {
                    if (err) {
                      return res.json({ err });
                    } else {
                      return res.json({
                        msg: "Login successful",
                        ...user,
                        token,
                      });
                    }
                  });
                } else {
                  res.json({ msg: "Wrong username OR password" });
                }
              })
              .catch((err) => res.json({ err }));
          } else {
            res.json({ msg: "Wrong username OR password" });
          }
        })
        .catch((err) => res.json({ err }));
    } else {
      res.json({ msg: "Please enter a value for username/password" });
    }
  });
  return router;
};
