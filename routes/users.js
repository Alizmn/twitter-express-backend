const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = ({ getUsers, jwtDecode }) => {
  /* GET users listing. */
  router.get("/", async function (req, res) {
    const verifyInfo = await jwtDecode(req);
    verifyInfo.err
      ? res.send(verifyInfo.err)
      : res.send(`Awesome! You're logged in as ${verifyInfo.username}`);
    // const token = req.header("Authorization");
    // jwt.verify(token, process.env.jwtSecret, (err, decoded) =>
    //   res.json({ username: decoded.username })
    // );
    // console.log(token, payload.username);
    // getUsers()
    //   .then((users) => res.json(users))
    //   .catch((err) => res.json({ msg: err.message }));
  });

  return router;
};
