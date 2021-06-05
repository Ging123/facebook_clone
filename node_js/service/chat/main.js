const {searchForChat, insertChat, updateMessages} = 
require("../../database/database");

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


async function sendMessageToDb(messageData) {
  const send = new Promise((result) => {
    searchForChat(messageData.chatId).then((chat) => {
      if(chat === "") return result(false);
      updateMessages(messageData, chat.chat).then(() => {
        result(true);
      });
    }); 
  });
  return await send;
}

module.exports = {getChatOfClientAndFriend, sendMessageToDb};