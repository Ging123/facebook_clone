const SECRET = "shhhh";
const KEY = 'nome-do-cookie';

const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const path = require("path");
const session = require("express-session"); 

const cookieParser = require('cookie-parser');
const cookie = cookieParser(SECRET);
const store = new session.MemoryStore();
app.use(cookie);

//ROTAS
const singin = require("./node_js/routes/singin");
const login = require("./node_js/routes/login");
const sessionRoute = require("./node_js/routes/sessionRoute");
const search = require("./node_js/routes/search");
const addFriends = require("./node_js/routes/addFriends");
const acceptFriends = require("./node_js/routes/acceptFriends");

app.use(session({
    secret: SECRET,
    name: KEY,
    resave: true,
    saveUninitialized: true,
    store: store
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

io.use(function(socket, next) {
  var data = socket.request;
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID, function(err, session) {
      if (err || !session) {
        return next(new Error('Acesso negado!'));
      } else {
        socket.handshake.session = session;
        return next();
      }
    });
  });
});

//TRATAMENTOS DE ROTAS PARA O WEB SOCKET
io.on("connection", (socket) => {
  //ENVIA UMA MENSAGEM DIZENDO QUE O CLIENTE TÁ ON E PERGUNTA SE SEUS AMIGOS ESTÃO
  socket.on("clientIsLogged", (client) => {
    var session = socket.handshake.session;
    //console.log(socket.handshake.session + "oi")
    const clientId = client.emailOrCellphone;
    const idOfClientFriends = client.friends.split(",");
    const friend = {id:clientId, status:true}
    socket.join(clientId);
    socket.join(idOfClientFriends);
    idOfClientFriends.forEach(friendId => {
      socket.broadcast.to(friendId).emit("friendIsAskingIfClientOnline", friend);
    });
  });


  socket.on("sendClientStatus", (friendId) => {
    if(friendId === "") {
      return socket.to(friendId).emit("friendSendHisStatus", 
      {id:friendId, status:false});
    } 
    socket.to(friendId).emit("friendSendHisStatus", {id:friendId, status:true});
  });


  socket.on("disconnect", () => {
    const client = socket.handshake.session.user;
    const idOfClientFriends = client.friends.split(",");
    idOfClientFriends.forEach(friendId => {
      socket.broadcast.to(friendId).emit("friendGotOffline", 
      {id:client.emailOrCellphone, status:false});
    });
  });
});


//A aplicação estará rodando no localhost:5000 
server.listen(5000);