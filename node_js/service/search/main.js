const {getUserDataWhenLogin, getFriends} = require("../../database/database");

async function searchByUser(emailOrNumber = "") {
  const search = new Promise((resultOfSearch) => {
    getUserDataWhenLogin(emailOrNumber).then((searchedData) => {
      if(searchedData.length === 0) return resultOfSearch("");
      return resultOfSearch(searchedData[0]);
    });
  })
  return await search;
}


async function getSearchedUserFriends(emailOrNumber = "") {
  const get = new Promise((resultOfSearch) => {
    getFriends(emailOrNumber).then((friendsData) => {
      resultOfSearch(friendsData);
    });
  });
  return await get;
}


function createObjectWithDataSearched(mainUserData, friendsData, clientEmailOrNumber) {
  return {
    fullname:mainUserData.fullname,
    emailOrCellphone:mainUserData.email_or_celphone,
    birthday:mainUserData.birthday,
    gender:mainUserData.gender,
    friends:friendsData.friends,
    canAskToBeFriend:validateIfClientCanAskToBeFriend(friendsData.friends_request,
    clientEmailOrNumber, friendsData.friends)
  }
}


function validateIfClientCanAskToBeFriend(friends_request, clientEmailOrNumber,
friendsThatThePersonAlredyHave) {
  if(friends_request === null) friends_request = "";
  if(friendsThatThePersonAlredyHave === null) friendsThatThePersonAlredyHave = "";
  const alredyAskToBeFriend = verifyIfClientAlredyAskFriendOfPerson(clientEmailOrNumber, friends_request);
  const alredyIsFriend = verifyIfClientAlredyIsFriendOfThatPerson(friendsThatThePersonAlredyHave, clientEmailOrNumber);
  if(alredyAskToBeFriend !== "") return alredyAskToBeFriend;
  if(alredyIsFriend !== "") return alredyIsFriend;
  return "pedir em amizade";
}


function verifyIfClientAlredyAskFriendOfPerson(clientEmailOrNumber, 
friends_request) {
  const arrayOfFriendsRequest = friends_request.split(" ");
  for(let i = 0; i < arrayOfFriendsRequest.length; i++) {
    if(arrayOfFriendsRequest[i] === clientEmailOrNumber) return "pedido enviado";
  }
  return "";
}


function verifyIfClientAlredyIsFriendOfThatPerson(friendsThatThePersonAlredyHave,
clientEmailOrNumber) {
  const arrayOfFriends = friendsThatThePersonAlredyHave.split(" ");
  for(let i = 0; i < arrayOfFriends.length; i++) {
    if(arrayOfFriends[i] === clientEmailOrNumber) return "amigo";
  }
  return "";
}

module.exports = {searchByUser, getSearchedUserFriends, 
createObjectWithDataSearched};