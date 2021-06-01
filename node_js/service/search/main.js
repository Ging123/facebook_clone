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
    clientEmailOrNumber)
  }
}


function validateIfClientCanAskToBeFriend(friends_request, clientEmailOrNumber) {
  if(friends_request === "" || friends_request === null) return true;
  const arrayOfFriendsRequest = friends_request.split(" ");
  for(let i = 0; i < arrayOfFriendsRequest.length; i++) {
    //caso essa condição aconteça significa que você já pediu a pessoa em amizade
    if(arrayOfFriendsRequest[i] === clientEmailOrNumber) return false;
  }
  return true;
}


module.exports = {searchByUser, getSearchedUserFriends, 
createObjectWithDataSearched};