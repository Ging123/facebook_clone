const {getUserDataWhenLogin, getFriends} = require("../../database/database");
const {turnNullInString} = require("./regex");

function createUserObject(mainData, friendsData) {
  return {
    fullname:mainData.fullname,
    emailOrCellphone:mainData.email_or_celphone,
    birthday:mainData.birthday,
    gender:mainData.gender,
    friends:turnNullInString(friendsData.friends),
    friendsRequest:turnNullInString(friendsData.friends_request)
  }
}


async function refreshSession(emailOrNumber) {
  const refresh = new Promise((dataToSession) => {
    getUserDataWhenLogin(emailOrNumber).then((user) => {
      getFriends(emailOrNumber).then((friendsData) => {
        dataToSession(createUserObject(user[0], friendsData));
      });
    });
  });
  return await refresh;
}

module.exports = {refreshSession};