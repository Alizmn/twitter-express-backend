const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = ({
  getByUsername,
  addUser,
  jwtDecode,
  jwtGenerate,
  alert,
}) => {
  router.post("/", async function (req, res) {
    if (req.header("Authorization")) {
      const verifyInfo = await jwtDecode(req);
      verifyInfo.err
        ? alert(res, 409, null, { err: verifyInfo.err })
        : alert(res, 400, 1);
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
                      return alert(res, 409, null, { err });
                    } else {
                      return alert(res, 200, 5, { ...data, token });
                    }
                  });
                })
                .catch((err) => res.send(err));
            });
          } else {
            alert(res, 401, 4);
          }
        })
        .catch((err) => alert(res, 417, null, { err }));
    } else {
      alert(res, 401, 3);
    }
  });
  return router;
};
