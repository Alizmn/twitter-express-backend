const express = require("express");
const router = express.Router();

module.exports = ({ getUsers }) => {
  /* GET users listing. */
  router.get("/", function (req, res) {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ msg: err.message }));
  });

  return router;
};
