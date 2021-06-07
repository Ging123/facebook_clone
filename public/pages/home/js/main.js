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
function constructHtmlUsignUserData() {
  $.get("/sessionRoute", "", (user) => {
    putPlaceholderInInput(user.fullname);
    putUsernameInAccount(user.fullname);
    seeIfUserHasAnyRequestToBeFriend(user.friendsRequest.split(","));
    putFriendsInChat(user.friends.split(","));
    socket.emit("clientIsLogged");
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


function createNavBar() {
  const href = ["https://www.facebook.com/coronavirus_info/?page_source=bookmark&hoisted_module_types%5B0%5D=update&hoisted_module_types%5B1%5D=vaccine_finder&hoisted_module_types%5B2%5D=vaccine_tracker&hoisted_module_types%5B3%5D=latest_news",
  "https://www.facebook.com/friends/", "https://www.facebook.com/watch/", 
  "https://www.facebook.com/?sk=welcome", "https://www.facebook.com/groups/discover/",
  "https://www.facebook.com/marketplace/?ref=bookmark", "https://www.facebook.com/events?source=46&action_history=null",
  "https://www.facebook.com/memories/?source=bookmark", "https://www.facebook.com/saved/?cref=28",
  "https://www.facebook.com/pages/?category=top&ref=bookmarks"];
  const text = ["COVID-19: Central de Informações", "Encontrar amigos", "Watch",
  "Bem-vindo(a)", "Grupos", "Marketplace", "Eventos", "Lembranças", "Salvo",
  "Páginas"];
  const src = ["public/pages/home/assets/covid.png", "public/pages/home/assets/find-friends.png" , 
  "public/pages/home/assets/watch.png", "public/pages/home/assets/welcome.png",
  "public/pages/home/assets/group.png", "public/pages/home/assets/marketplace.png",
  "public/pages/home/assets/events.png", "public/pages/home/assets/remeber.png",
  "public/pages/home/assets/save.png", "public/pages/home/assets/pages.png"];
  const navBarContainer = document.querySelector("#nav-bar");
  for(let i = 0; i < text.length; i++) {
    const linkContainer = createLinkBarForNavBar(href[i], src[i], text[i]);
    navBarContainer.appendChild(linkContainer);
  }
}


function createLinkBarForNavBar(href, src, text) {
  const container = createNewLinkTag(href);
  const img = createNewImage(src);
  const div = createNewElement("div", "", text);
  container.appendChild(img);
  container.appendChild(div);
  return container;
}

constructHtmlUsignUserData();
createSubContainers();
createNavBar();