const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = ({ getByUsername, addUser }) => {
  router.post("/", function (req, res) {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
    };

    getByUsername(newUser.username)
      .then((user) => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            newUser.password = hash;
            addUser(newUser.username, newUser.password)
              .then((data) =>
                res.json({ msg: "created successfully", ...data })
              )
              .catch((err) => res.send(err));
          });
        } else {
          res.json({ msg: "username already in use" });
        }
      })
      .catch((err) => res.send(err));
  });
  return router;
};
