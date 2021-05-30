const mysql = require("mysql");

var connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"facebook"
});


async function hasEqual(value = "", column = "") {
  let search = new Promise((resultOfSearch) => {
    connection.query(`select ${column} from users_info where ${column} = ?`, [value], 
    (err, result) => { 
      if(err) throw err;
      const quantityOfValuesEqual = result.length;
      if(quantityOfValuesEqual > 0) return resultOfSearch(true);
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

/*async function getColumn(column = "") {
  let databaseValues = new Promise((values) => {
    connection.query(`select * from users_info order by fullname`, 
    (err, result) => {
      if(err) throw err;
      values(result);
    });
  })
  return await databaseValues;
}*/



module.exports = {hasEqual, insertUser};