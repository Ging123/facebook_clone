const {searchForChat, insertChat} = require("../../database/database");

async function getChatOfClientAndFriend(chatId) {
  const get = new Promise((chatFound) => {
    searchForChat(chatId).then((chat) => {
      if(chat !== "") return chatFound(chat);
      insertChat(chatId).then(() => {
        chatFound("");
      });
    });
  });
  return await get;
}

module.exports = getChatOfClientAndFriend;