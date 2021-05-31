const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const loginUser = require("../service/login/main");
const {getUserDataWhenLogin} = require("../database/database");

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
  getUserDataWhenLogin(req.fields.emailOrNumber).then((user) => {
    req.session.user = user[0];
    res.send("");
  });
});

module.exports = router;