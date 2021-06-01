const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const {seeIfPeopleIsAskingToBeFriend, acceptFriend
} = require("../service/acceptFriends/main");
router.use(formidable());

router.post("/", (req, res, next) => {
  const emailOrNumOfPersonToAccept = req.fields.emailOrNumber;
  const clientEmailOrNum = req.session.user.emailOrCellphone;
  const friendsRequestOfClient = req.session.user.friendsRequest;
  if(clientEmailOrNum === undefined) return res.send("");
  const peopleWannaBeFriend = seeIfPeopleIsAskingToBeFriend(emailOrNumOfPersonToAccept, 
  friendsRequestOfClient);
  if(peopleWannaBeFriend) return next();
  res.send(false);
});


router.post("/", (req, res) => {
  const emailOrNumOfPersonToAccept = req.fields.emailOrNumber;
  const clientEmailOrNum = req.session.user.emailOrCellphone;
  acceptFriend(emailOrNumOfPersonToAccept, clientEmailOrNum).then((done) => {
    if(done) return res.send(true);
    res.send(false);
  });
});

module.exports = router;