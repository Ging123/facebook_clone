const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const makeRequestToBeFriendOfPerson = require("../service/addFriends/main");

router.use(formidable());

router.post("/", (req, res, next) => {
  const emailOrNumOfPersonToAdd = req.fields.emailOrNumber;
  const clientEmailOrNum = req.session.user.emailOrCellphone;
  if(clientEmailOrNum === undefined) return res.send("");
  if(emailOrNumOfPersonToAdd === clientEmailOrNum) return res.send("");
  makeRequestToBeFriendOfPerson(emailOrNumOfPersonToAdd, clientEmailOrNum)
  .then((sucess) => {
    if(sucess) return res.send(true);
    res.send(false);
  });
});

module.exports = router;