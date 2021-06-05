//FUNÇÕES DE INTERAÇÃO COM O WEB SOCKET
socket.on("friendIsAskingIfClientOnline", (friend) => {
  manipulateStatusIcone(friend);
  $.get("/sessionRoute", "", (user) => {
    if(user !== "") return socket.emit("sendClientStatus", user.emailOrCellphone);
    socket.emit("sendClientStatus", "");
  });
});


socket.on("friendSendHisStatus", (friend) => {
  manipulateStatusIcone(friend);
});


socket.on("friendGotOffline", (friend) => {
  manipulateStatusIcone(friend);
});


function manipulateStatusIcone(friend) {
  const selectorId = friend.id + "status";
  const statusHtml = document.getElementById(selectorId);
  if(statusHtml === null) return console.log("erro");
  const statusIcone = statusHtml.getElementsByClassName("status")[0];
  if(friend.status === true) {//tá online
    return statusIcone.style.background = "green";
  }
  statusIcone.style.background = "red";
}

//FUNÇÕES QUE INTERAGEM COM O BACKEND VIA HTTP
function addToFriends() {
  const inputValue = document.querySelector("#input-to-add").value;
  const userToBeAdd = {emailOrNumber:inputValue}
  $.post("/addFriends", userToBeAdd, (result) => {
    alert(result);
  });
}


function constructHtmlUsignUserData() {
  $.get("/sessionRoute", "", (user) => {
    putPlaceholderInInput(user.fullname);
    putUsernameInAccount(user.fullname);
    putFriendsInChat(user.friends.split(","));
    socket.emit("clientIsLogged", user);
    socket.emit("connectClientWithFriends");
  });
}

const putUsernameInAccount = fullname => $("#fullNameOfUser").text(fullname);

function putPlaceholderInInput(fullname = "") {
  const placeholder = `No que você está pensando, ${fullname}`;
  document.querySelector("#what-you-thinking-input").placeholder = placeholder;
}


function logout() {$.get("/sessionRoute/logout", "", () => {window.location = "/";});}

//FUNÇÕES PARA A CONSTRUÇÃO DO CHAT
function putFriendsInChat(friends) {
  const friendBox = document.querySelector("#friends-box-container");
  const Classes = "sub-account-container dark-gray-effect small-margin-top";
  for(let i = 0; i < friends.length; i++) {
    const containerFataher = createNewElement("div", "friends-container");
    const subContainer = createNewElement("div", Classes);
    const imageContainer = createFriendImageContainer(friends[i]);
    const nameContainer = createNameContainer(friends[i]);
    subContainer.appendChild(imageContainer);
    subContainer.appendChild(nameContainer);
    containerFataher.append(subContainer);
    containerFataher.addEventListener("click", () => openChat(friends[i]))
    friendBox.appendChild(containerFataher);
  }
}


function createFriendImageContainer(id) {
  const src = "public/global/assets/user_image.jpg";
  const container = createNewElement("div", "user-image-container","", id+"status");
  const image = createNewImage(src, "user-image");
  const statusIcone = createNewElement("div", "status");
  container.appendChild(image);
  container.appendChild(statusIcone);
  return container;
}


function createNameContainer(fullname) {
  const container = createNewElement("div", "small-margin-left");
  const text = createNewElement("div", "bold", fullname);
  container.appendChild(text);
  return container;
}


//FUNÇÕES PARA AUXILIAR NA CONSTRUÇÃO DO CONTAINER 'ACCOUNT'
function createSubContainers() {
  const containerOfAllElements = document.querySelector("#home-account-container");
  const quantity = 4;
  const divFather = createDivFather(quantity);
  const iconeContainer = createIconeContainer(quantity);
  const textContainer = createTextContainer(quantity);
  for(let i = 0; i < quantity; i++) {
    divFather[i].appendChild(iconeContainer[i]);
    divFather[i].appendChild(textContainer[i]);
    containerOfAllElements.appendChild(divFather[i]);
  }
}


function createDivFather(quantity = 4) {
  const divFatherClass = "sub-account-container dark-gray-effect small-margin-top";
  const divFather = new Array(quantity);
  for(let i = 0; i < quantity; i++) {
    divFather[i] = createNewElement("div", divFatherClass);
    if(i === quantity - 1) {
      divFather[i].addEventListener("click", logout);
    }
  }
  return divFather;
}


function createIconeContainer(quantity = 4) {
  const iconesClasses = ["fas fa-cog", "fas fa-question-circle", "fas fa-moon", 
  "fas fa-door-open"];
  const iconeContainer = new Array(quantity);
  const icone =  new Array(quantity);
  for(let i = 0; i < quantity; i++) {
    iconeContainer[i] = createNewElement("div", "circule-container");
    icone[i] = createNewElement("i", iconesClasses[i]);
    iconeContainer[i].appendChild(icone[i]);
  }
  return iconeContainer;
}


function createTextContainer(quantity = 4) {
  const text = ["Configurações e privacidade", "Ajuda e suporte", 
  "Exibição e acessibilidade", "Sair"];
  const textContainer = new Array(quantity);
  const divOfTexts = new Array(quantity);
  for(let i = 0; i < quantity; i++) {
    textContainer[i] = createNewElement("div", "small-margin-left");
    divOfTexts[i] = createNewElement("div", "bold", text[i]);
    textContainer[i].appendChild(divOfTexts[i])
  }
  return textContainer;
}


function showAccountOptions()  {
  document.querySelector("#container-of-screen").
  addEventListener("mousedown", hideAccountOptions);
  document.querySelector("#home-main-header").
  addEventListener("mousedown", hideAccountOptions);
  $("#home-account-container").show();
}


function hideAccountOptions() {
  document.querySelector("#container-of-screen").
  removeEventListener("mousedown", hideAccountOptions);
  document.querySelector("#home-main-header").
  removeEventListener("mousedown", hideAccountOptions);
  $("#home-account-container").hide();
}


function showMessagesBar() {
  document.querySelector("#container-of-screen").
  addEventListener("mousedown", hideMessageBar);
  document.querySelector("#home-main-header").
  addEventListener("mousedown", hideMessageBar);
  $("#friends-box-container").show();
}


function hideMessageBar() {
  document.querySelector("#container-of-screen").
  removeEventListener("mousedown", hideMessageBar);
  document.querySelector("#home-main-header").
  removeEventListener("mousedown", hideMessageBar);
  $("#friends-box-container").hide();
}

constructHtmlUsignUserData();
createSubContainers();