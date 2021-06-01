const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session"); 
//ROTAS
const singin = require("./node_js/routes/singin");
const login = require("./node_js/routes/login");
const sessionRoute = require("./node_js/routes/sessionRoute");
const search = require("./node_js/routes/search");

app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));
app.use("/public", express.static(__dirname + "/public"));

//COMO O APP DEVE RESPONDER PARA CADA ROTA
app.use("/singin", singin);
app.use("/login", login);
app.use("/sessionRoute", sessionRoute);
app.use("/search", search);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/pages/login/index.html"));
});

//A aplicação estará rodando no localhost:5000 
app.listen(5000);