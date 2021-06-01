const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const loginUser = require("../service/login/main");
const {refreshSession} = require("../service/util/session");



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
  refreshSession(emailOrNumber).then((dataToSession) => {
    req.session.user = dataToSession;
    res.send("");
  });
});

module.exports = router;