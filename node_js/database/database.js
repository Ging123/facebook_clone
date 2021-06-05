//IMPORT MYSQL LIBRARY
const mysql = require("mysql");
const {turnNullInString, 
removeValueFromArrayAnTurnInString} = require("../service/util/regex");

//CREATE CONNECTION WITH DATABASE
const connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"facebook"
});


//METODOS QUE INTERAGEM COM A TABELA USERS_INFO
async function valueExistInDatabase(value = "", column = "") {
  let search = new Promise((resultOfSearch) => {
    connection.query(`select ${column} from users_info where ${column} = ?`,[value], 
    (err, result) => { 
      if(err) throw err;
      const quantityOfTheValueInDatabase = result.length;
      if(quantityOfTheValueInDatabase > 0) return resultOfSearch(true);
      resultOfSearch(false);
    })
  });
  return await search;
}


async function insertUser(user) {
  const emailOrCellphone = user.emailOrCellphone;
  const allColumns="(fullname, email_or_celphone, user_password, birthday, gender)";
  let insert = new Promise((resultOfInsert) => {
    connection.query(`insert into users_info ${allColumns}values(?, ?, ?, ?, ?)`,
    [user.fullname, user.emailOrCellphone, user.password, user.birthday, user.gender],
    (err) => {
      if(err) throw err;
      insertInFriendsTable(emailOrCellphone);
      resultOfInsert(true);
    });
  });
  return await insert;
}


async function searchDataToLogin(user) {
  const columns = "email_or_celphone, user_password";
  let search = new Promise((loginIsValid) => {
    connection.query(`select ${columns} from users_info where 
    email_or_celphone = ? and user_password = ?`, 
    [user.emailOrNumber, user.password], 
    (err, result) => {
      if(err) throw err;
      if(result.length !== 1) return loginIsValid(false);
      return loginIsValid(true);
    })
  });
  return await search;
}


async function getUserDataWhenLogin(emailOrNumber = "") {
  const columns = "fullname, email_or_celphone, birthday, gender";
  const get = new Promise((receivedData) => {
    connection.query(`select ${columns} from users_info where 
    email_or_celphone = ?`, [emailOrNumber],
    (err, userData) => {
      if(err) throw err;
      receivedData(userData);
    }); 
  });
  return await get;
}

//METODOS QUE INTERAGEM COM A TABELA 'FRIENDS'
async function insertInFriendsTable(id) {
  connection.query("insert into friends (id) values (?)", [id],
  (err) => {if(err) throw err;});
}


async function getFriends(emailOrNumber = "") {
  const columns = "friends, friends_request";
  const get = new Promise((receivedData) => {
    connection.query(`select ${columns} from friends where id = ?`, 
    [emailOrNumber],
    (err, userData) => {
      if(err) throw err;
      receivedData(userData[0]);
    }); 
  });
  return await get;
}


function requestToBeAddAsFriend(whoIsAsking, whoWillGetTheRequest, 
currentFriendsRequests) {
  let newFriendsRequest = createFriendsRequest(currentFriendsRequests,whoIsAsking);
  connection.query(`update friends set friends_request = ? where id = ?`, 
  [newFriendsRequest, whoWillGetTheRequest]),
  (err) => {if(err) throw err}
}


function createFriendsRequest(currentFriendsRequests, whoIsAsking) {
  if(currentFriendsRequests === "")  return `${whoIsAsking}`;
  return `${currentFriendsRequests},${whoIsAsking}`;
}


async function acceptRequestToBeFriend(whoWillToAccept, whoWillBeAccepted) {
  const accept = new Promise((done) => {
    getFriends(whoWillToAccept).then((clientData) => {
      const clientFriends = createFriendsString(clientData.friends, whoWillBeAccepted);
      const clientRequest = createClientRequestWithoutAnUser(clientData.friends_request, 
      whoWillBeAccepted);
      updateFriendsAndFriendsRequest(clientFriends, clientRequest, whoWillToAccept).
      then((clientFriendsRefreshed) => {
        if(clientFriendsRefreshed) return done(true);
        done(false);
      });
    });
  });
  return await accept;
}


function createClientRequestWithoutAnUser(requests, whoMustBeRemoved) {
  requests = turnNullInString(requests);
  if(requests === "") return "";
  const arrayOfRequests = requests.split(",");
  return removeValueFromArrayAnTurnInString(arrayOfRequests, whoMustBeRemoved);
}


function createFriendsString(clientFriends, whoWillBeAdded) {
  clientFriends = turnNullInString(clientFriends);
  if(clientFriends === "") return `${whoWillBeAdded}`;
  return `${clientFriends},${whoWillBeAdded}`;
}


async function updateFriendsAndFriendsRequest(friends, friendsRequest, id) {
  const update = new Promise((done) => {
    connection.query(`update friends set friends = ?, friends_request = ? 
    where id = ?`, [friends, friendsRequest, id],
    (err) => {
      if(err) throw err;
      done(true);
    });
  });
  return await update;
}


/*FUNÇÕES PARA TABELA DE CHAT*/
async function searchForChat(chatId) {
  const search = new Promise((chat) => {
    connection.query("select * from chat where id = ?", [chatId], 
    (err, chatFound) => {
      if(err) throw err;
      if(chatFound.length === 0) return chat("");
      chat(chatFound[0]);
    });
  });
  return await search;
}


async function insertChat(chatId) {
  const insert = new Promise((result) => {
    connection.query("insert into chat (id) values (?)", [chatId], (err) => {
      if(err) throw err;
      result(true);
    })
  });
  return await insert;
}


async function updateMessages(messageInfo, currentMessages) {
  const message = {whoSend:messageInfo.whoSend, message:messageInfo.message};
  const newMessages = createNewMessages(message, currentMessages);
  const update = new Promise((sucess) => {
    connection.query("update chat set chat = ? where id = ?", 
    [newMessages, messageInfo.chatId], (err) => {
      if(err) throw err;
      sucess(true);
    });
  });
  return await update;
}


function createNewMessages(messageToBeAdd, currentMessages) {
  messageToBeAdd = JSON.stringify(messageToBeAdd);
  if(currentMessages === null || currentMessages === "") {
    return `${messageToBeAdd}`;
  }
  return `${currentMessages}/,/${messageToBeAdd}`;
}


module.exports = {valueExistInDatabase, insertUser, searchDataToLogin, 
getUserDataWhenLogin, getFriends, requestToBeAddAsFriend, acceptRequestToBeFriend,
searchForChat, insertChat, updateMessages};