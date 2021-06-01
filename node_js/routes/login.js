const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const {loginUser, createUserObject} = require("../service/login/main");
const {getUserDataWhenLogin, getFriends} = require("../database/database");

router.use(formidable());

router.post("/", (req, res, next) => {
  const user = req.fields;
  if(user.emailOrNumber === "") return res.send("o campo de email está vazio");
  if(user.password === "") return res.send("o campo do password está vazio");
  loginUser(user).then((erroInLogin) => {
    if(erroInLogin !== "") return res.send(erroInLogin);
    next();
  });
});


router.post("/", (req, res) => {
  const emailOrNumber = req.fields.emailOrNumber;
  getUserDataWhenLogin(emailOrNumber).then((user) => {
    getFriends(emailOrNumber).then((friendsData) => {
      req.session.user = createUserObject(user[0], friendsData);
      res.send("");//IRA RETORNAR TRUE QUANDO TIVER A PROXIMA TELA
    });
  });
});

module.exports = router;