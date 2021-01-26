const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = ({ getByUsername, addUser, jwtDecode, jwtGenerate }) => {
  router.post("/", async function (req, res) {
    if (req.header("Authorization")) {
      const verifyInfo = await jwtDecode(req);
      verifyInfo.err
        ? res.json({ msg: verifyInfo.err })
        : res.json({
            msg: `You are already logged in as ${verifyInfo.username}. If you want to use another account please signout first.`,
          });
    } else if (req.body.username && req.body.password) {
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
                .then((data) => {
                  jwtGenerate(data.username, (err, token) => {
                    if (err) {
                      return res.json({ err });
                    } else {
                      return res.json({
                        msg: "Created successfully",
                        ...data,
                        token,
                      });
                    }
                  });
                })
                .catch((err) => res.send(err));
            });
          } else {
            res.json({ msg: "Username already in use" });
          }
        })
        .catch((err) => res.send(err));
    } else {
      res.json({ msg: "Please enter a value for username/password" });
    }
  });
  return router;
};
