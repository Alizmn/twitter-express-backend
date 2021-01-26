const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = ({ getByUsername, jwtGenerate, jwtDecode, alert }) => {
  router.post("/", async function (req, res) {
    if (req.header("Authorization")) {
      const verifyInfo = await jwtDecode(req);
      verifyInfo.err
        ? alert(res, 409, null, { err: verifyInfo.err })
        : alert(res, 400, 1);
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
                      return alert(res, 409, null, { err });
                    } else {
                      return alert(res, 200, 0, { ...user, token });
                    }
                  });
                } else {
                  alert(res, 401, 2);
                }
              })
              .catch((err) => alert(res, 409, null, { err }));
          } else {
            alert(res, 401, 2);
          }
        })
        .catch((err) => alert(res, 417, null, { err }));
    } else {
      alert(res, 401, 3);
    }
  });
  return router;
};
