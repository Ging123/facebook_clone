const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const {createChatId} = require("../service/util/regex");
const {getChatOfClientAndFriend, sendMessageToDb} = 
require("../service/chat/main");

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


router.post("/saveMessage", (req, res) => {
  const client = req.session.user;
  const friend = req.fields;
  const chatId = createChatId(client.emailOrCellphone, friend.id);
  const messageInfo = {
    whoSend:client.emailOrCellphone,
    message:friend.message,
    chatId:chatId
  }
  sendMessageToDb(messageInfo).then(() => {
    res.send("");
  });
});

module.exports = router;