//IMPORT MYSQL LIBRARY
const mysql = require("mysql");

//CREATE CONNECTION WITH DATABASE
var connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"facebook"
});


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
  const allColumns="(fullname, email_or_celphone, user_password, birthday, gender)";
  let insert = new Promise((resultOfInsert) => {
    connection.query(`insert into users_info ${allColumns}values(?, ?, ?, ?, ?)`,
    [user.fullname, user.emailOrCellphone, user.password, user.birthday, user.gender],
    (err) => {
      if(err) throw err;
      resultOfInsert(true);
    })
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

module.exports = {valueExistInDatabase, insertUser, searchDataToLogin, 
getUserDataWhenLogin};