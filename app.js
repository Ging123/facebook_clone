const express = require("express");
const app = express();

/*essa variavel é usada para fazer o envio de páginas html como resposta*/
const path = require("path");

/*Importa uma biblioteca para trabalhar 
com sessions mas não se preocupem com isso*/
const session = require("express-session"); 

/*Ativa a biblioteca session na variavel "app"*/
app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/pages/login/index.html"));
});

//A aplicação estará rodando no localhost:5000 
app.listen(5000);