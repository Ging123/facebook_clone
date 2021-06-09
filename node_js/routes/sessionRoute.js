const express = require("express");
const router = express.Router();
const {refreshSession} = require("../service/util/session");

//SE O USUARIO COLOCAR O EMAIL E SENHA CORRETOS ESSA ROTA IRÁ RETORNAR SEUS DADOS
router.get("/", (req, res) => {
  const userData = req.session.user;
  if(userData === undefined) return res.send("");
  res.send(userData);
});

router.get("/logout", (req, res) => {
  const userData = req.session.user;
  if(userData === undefined) return res.redirect("/");
  req.session.destroy((err) => {if(err) throw err;});
  res.redirect("/");
});

router.get("/refresh", (req, res) => {
  refreshSession(req.session.user.emailOrCellphone).then((data) => {
    req.session.user = data;
    res.send(req.session.user);
  });
});

module.exports = router;