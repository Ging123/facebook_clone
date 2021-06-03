const {getFriends, requestToBeAddAsFriend} = require("../../database/database");
const {turnNullInString} = require("../../service/util/regex");

async function makeRequestToBeFriendOfPerson(emailOrNumberOfPerson, clientEmailOrNum) {// req = requests
  const get = new Promise((sucess) => {
    getFriends(emailOrNumberOfPerson).then((friendsData) => {
      if(friendsData === undefined) return sucess(false);
      const personFriends = turnNullInString(friendsData.friends);
      const reqToThisPerson = turnNullInString(friendsData.friends_request); 
      if(alredyIsFriend(clientEmailOrNum, personFriends)) return sucess(false);
      if(alredyAskToBeFriend(clientEmailOrNum, reqToThisPerson)) return sucess(false);
      requestToBeAddAsFriend(clientEmailOrNum, emailOrNumberOfPerson, reqToThisPerson);
      sucess(true);
    });
  });
  return await get;
}


function alredyIsFriend(clientEmailOrNum, friendsOfPerson) {
  const arrayOfFriends = friendsOfPerson.split(",");
  for(let i = 0; i < arrayOfFriends.length; i++) {
    if(arrayOfFriends[i] === clientEmailOrNum) return true;
  }
  return false;
}


function alredyAskToBeFriend(clientEmailOrNum, reqToThisPerson) {
  const arrayOfRequests = reqToThisPerson.split(",");
  for(let i = 0; i < arrayOfRequests.length; i++) {
    if(arrayOfRequests[i] === clientEmailOrNum) return true;
  }
  return false;
}

module.exports = makeRequestToBeFriendOfPerson;