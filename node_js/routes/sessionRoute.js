const express = require("express");
const router = express.Router();

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

module.exports = router;