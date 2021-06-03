const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const makeRequestToBeFriendOfPerson = require("../service/addFriends/main");

router.use(formidable());

router.post("/", (req, res, next) => {
  const erroNotLogged = "logue primeiro para poder adicionar";
  const cantAddYourself = "erro você não pode se adicionar";
  const emailOrNumOfPersonToAdd = req.fields.emailOrNumber;
  const clientEmailOrNum = req.session.user.emailOrCellphone;
  if(clientEmailOrNum === undefined) return res.send(erroNotLogged);
  if(emailOrNumOfPersonToAdd === clientEmailOrNum) return res.send(cantAddYourself);
  makeRequestToBeFriendOfPerson(emailOrNumOfPersonToAdd, clientEmailOrNum)
  .then((sucess) => {
    if(sucess) return res.send("Pedido de amizade enviado");
    res.send("Você não pode mais pedir essa pessoa em amizade");
  });
});

module.exports = router;