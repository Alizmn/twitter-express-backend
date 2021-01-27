const express = require("express");
const router = express.Router();
require("dotenv").config();

/* GET home page. */
module.exports = ({ jwtDecode, alert, getTweetsByUsername }) => {
  router.get("/", async function (req, res, next) {
    if (req.header("Authorization")) {
      const verifyInfo = await jwtDecode(req);
      if (verifyInfo.err) {
        alert(res, 409, null, { err: verifyInfo.err });
      } else {
        getTweetsByUsername(verifyInfo.username).then((tweets) => {
          if (tweets.length > 0) {
            alert(res, 200, null, { ...tweets });
          } else {
            alert(res, 200, null, { msg: "No tweet yet!" });
          }
        });
      }
    } else {
      alert(res, 200, 6);
    }
  });

  return router;
};
