const express = require("express");
const router = express.Router();
require("dotenv").config();

/* GET home page. */
module.exports = ({ jwtDecode, alert, getIdByUsername, addTweetById }) => {
  router.post("/", async function (req, res) {
    if (req.header("Authorization")) {
      const verifyInfo = await jwtDecode(req);
      if (verifyInfo.err) {
        alert(res, 409, null, { err: verifyInfo.err });
      } else if (req.body.tweet) {
        getIdByUsername(verifyInfo.username)
          .then((id) => {
            addTweetById(req.body.tweet, id)
              .then((tweet) => {
                alert(res, 200, null, { ...tweet });
              })
              .catch((err) => alert(res, 401, null, { err }));
          })
          .catch((err) => alert(res, 401, null, { err }));
      } else {
        alert(res, 401, 8);
      }
    } else {
      alert(res, 401, 9);
    }
  });

  return router;
};
