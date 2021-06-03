const {acceptRequestToBeFriend} = require("../../database/database");

async function acceptFriend(emailOrNumOfPersonToAccept, clientEmailOrNum) {
  const accept = new Promise((done) => {
    acceptRequestToBeFriend(clientEmailOrNum, emailOrNumOfPersonToAccept).then((clientRefreshed) => {
      if(clientRefreshed === false) return done(false);
      acceptRequestToBeFriend(emailOrNumOfPersonToAccept, clientEmailOrNum).
      then((otherClientRefreshed) => {
        if(otherClientRefreshed === false) return done(false);
        done(true);
      })
    });
  });
  return await accept;
}

function seeIfPeopleIsAskingToBeFriend(emailOrNumOfPersonToAccept, 
friendsRequestOfClient) {
  const arrayOfRequests = friendsRequestOfClient.split(",");
  for(let i = 0; i < arrayOfRequests.length; i++) {
    if(arrayOfRequests[i] === emailOrNumOfPersonToAccept) return true;
  }
  return false;
}


module.exports = {acceptFriend, seeIfPeopleIsAskingToBeFriend};