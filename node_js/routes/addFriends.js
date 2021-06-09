const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const makeRequestToBeFriendOfPerson = require("../service/addFriends/main");
const {refreshSession} = require("../service/util/session");

router.use(formidable());

router.post("/", (req, res, next) => {
  const erroNotLogged = "logue primeiro para poder adicionar";
  const cantAddYourself = "erro você não pode se adicionar";
  const emailOrNumOfPersonToAdd = req.fields.emailOrNumber;
  const clientEmailOrNum = req.session.user.emailOrCellphone;
  if(emailOrNumOfPersonToAdd === "") return res.send("campo vazio"); 
  if(clientEmailOrNum === undefined) return res.send(erroNotLogged);
  if(emailOrNumOfPersonToAdd === clientEmailOrNum) return res.send(cantAddYourself);
  makeRequestToBeFriendOfPerson(emailOrNumOfPersonToAdd, clientEmailOrNum)
  .then((sucess) => {
    if(sucess) return next(); 
    res.send("você não pode pedir essa pessoa em amizade");
  });
});


router.post("", (req, res) => {
  refreshSession(req.session.user.emailOrCellphone).then((data) => {
    req.session.user = data;
    res.send("pedido enviado");
  });
});

module.exports = router;