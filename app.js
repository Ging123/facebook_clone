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


//Cuida de qualquer get feito na rota "/"
app.get("/", (req, res) => {
  /*Quando se abrir localhost:3000 esse código abaixo irar enviar a página 
  loginOrSingin.html como resposta*/
  res.sendFile(path.join(__dirname + "/public/loginOrSingin.html"));
});

//A aplicação estará rodando no localhost:3000 
app.listen(3000);