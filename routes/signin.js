const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = ({ getByUsername, addUser }) => {
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
              res.json({ msg: "Correct username password" });
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
