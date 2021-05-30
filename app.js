const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session"); 
//ROTAS
const singin = require("./node_js/routes/singin");

app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));
app.use("/public", express.static(__dirname + "/public"));
app.use("/singin", singin);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/pages/login/index.html"));
});

//A aplicação estará rodando no localhost:5000 
app.listen(5000);