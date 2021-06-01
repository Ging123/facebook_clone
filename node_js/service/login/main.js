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

module.exports = loginUser;