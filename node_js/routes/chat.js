const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const {createChatId} = require("../service/util/regex");
const getChatOfClientAndFriend = require("../service/chat/main");

router.use(formidable());

router.post("/", (req, res) => {
  const clientId = req.session.user.emailOrCellphone;
  const friendId = req.fields.emailOrCellphone;
  const chatId = createChatId(clientId, friendId);
  getChatOfClientAndFriend(chatId).then(chat => {
    if(chat === "") return res.send("");
    res.send(chat.chat);
  });
});

module.exports = router;