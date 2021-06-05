socket.on("messageReceved", message => {
  createClientRecevedBallon(message);
});


function openChat(friend) {
  hideMessageBar();
  document.querySelectorAll("body")[0]
  .addEventListener("keydown", sendMessageOnEnter);
  document.getElementById("friendEmail").textContent = friend;
  $.post("/chat", {emailOrCellphone:friend}, (res) => {
    $("#chat-box").show();
  });
}


function closeChat() {
  document.getElementById("chat-area").innerHTML = "";
  $("#chat-box").hide();
  document.querySelectorAll("body")[0].
  removeEventListener("keydown", sendMessageOnEnter);
}


const sendMessageOnEnter = (e) => { if(e.keyCode === 13) sendMessage(); }


function sendMessage() {
  const message = document.querySelector("#input-of-chat");
  const friend = document.getElementById("friendEmail").textContent;
  createClientChatBallon(message.value);
  const friendMessage = {id:friend, message:message.value}
  socket.emit("sendMessage", friendMessage);
  message.value = "";
}


function createClientChatBallon(message) {
  const chatContainer = document.querySelector("#chat-area");
  const ballonContainer = createNewElement("div", "client-ballon-container");
  const clientBallon = createNewElement("div", "client-ballon", message);
  ballonContainer.appendChild(clientBallon);
  chatContainer.appendChild(ballonContainer);
}


function createClientRecevedBallon(message) {
  const chatContainer = document.querySelector("#chat-area");
  const ballonContainer = createNewElement("div", "friend-chat-container");
  const friendBallon = createNewElement("div", "friend-ballon", message);
  ballonContainer.appendChild(friendBallon);
  chatContainer.appendChild(ballonContainer);
}