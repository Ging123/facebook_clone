const {searchDataToLogin, valueExistInDatabase } = require('../../database/database');

async function loginUser(user) {
  const login = new Promise((resultOfLogin) => {
      searchDataToLogin(user).then((loginIsValid) => {
      if(loginIsValid) return resultOfLogin("");
      verifyWhatWasTheErroInLogin(user).then((erro) => {
        resultOfLogin(erro);
      });
    });
  });
  return await login;
}


async function verifyWhatWasTheErroInLogin(user) {
  const verify = new Promise((resultOfVerify) => {
    valueExistInDatabase(user.emailOrNumber, "email_or_celphone").then((exist) => {
      if(exist === true) return resultOfVerify("Sua senha foi digitada errada");
      return resultOfVerify("Esse email ou número não existe");
    })
  });
  return await verify;
}


function createUserObject(mainData, friendsData) {
  return {
    fullname:mainData.fullname,
    emailOrCellphone:mainData.email_or_celphone,
    birthday:mainData.birthday,
    gender:mainData.gender,
    friends:friendsData.friends,
    friendsRequest:friendsData.friends_request
  }
  
}

module.exports = {loginUser, createUserObject};