const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const path = require("path");
const session = require("express-session"); 
const {turnStringInArray} = require("./node_js/service/util/regex");

//ROTAS
const singin = require("./node_js/routes/singin");
const login = require("./node_js/routes/login");
const sessionRoute = require("./node_js/routes/sessionRoute");
const search = require("./node_js/routes/search");
const addFriends = require("./node_js/routes/addFriends");
const acceptFriends = require("./node_js/routes/acceptFriends");

app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));
app.use("/public", express.static(__dirname + "/public"));

//COMO O app DEVE RESPONDER PARA CADA ROTA
app.use("/singin", singin);
app.use("/login", login);
app.use("/sessionRoute", sessionRoute);
app.use("/search", search);
app.use("/addFriends", addFriends);
app.use("/acceptFriends", acceptFriends);

//ROTAS QUE VÃO RETORNAR PÁGINAS HTML
app.get("/", (req, res) => {
  if(req.session.user === undefined) {
    //pagina para se logar ou se cadastrar
    return res.sendFile(path.join(__dirname + "/public/pages/login/index.html"));
  }
  //Página inicial do usuario
  res.sendFile(path.join(__dirname + "/public/pages/home/index.html"));
});

//TRATAMENTOS DE ROTAS PARA O WEB SOCKET
io.on("connection", (socket) => {
  socket.on("getOnline", (user) => {
    console.log(user);
  });
});

//A aplicação estará rodando no localhost:5000 
server.listen(5000);