socket.on("someoneAskToBeYourFriend", whoIsAsking => {
  $.get("sessionRoute", user => {
    const friendsRequest = user.friendsRequest.split(",");
    for(let i = 0; i < friendsRequest; i++) {
      if(friendsRequest[i] === whoIsAsking) return;
    }
    putFriendRequestInScreen(whoIsAsking);
  });
});


function seeIfUserHasAnyRequestToBeFriend(friendsRequest) {
  if(friendsRequest.length === 0 || friendsRequest[0] === "") return;
  for(let i = 0; i < friendsRequest.length; i++) {
    putFriendRequestInScreen(friendsRequest[i]);
  }
}


function addToFriends() {
  const inputValue = document.querySelector("#input-to-add").value;
  const userToBeAdd = {emailOrNumber:inputValue}
  $.post("/addFriends", userToBeAdd, (result) => {
    alert(result);
    socket.emit("addFriend", inputValue);
  });
}


function putFriendRequestInScreen(whoIsAsking) {
  const classes = "dark-gray-effect friend-request-box";
  const src = "public/global/assets/user_image.jpg";
  const friendsRequestContainer = document.getElementById("friend-request-container");
  const friendRequestBox = createNewElement("div", classes);
  const image = createNewImage(src, "user-image");
  const acceptRequestContainer = createAcceptRequestContainer(whoIsAsking);
  friendRequestBox.appendChild(image);
  friendRequestBox.appendChild(acceptRequestContainer);
  friendsRequestContainer.appendChild(friendRequestBox);
  $("#friend-request-container").show();
}


function createAcceptRequestContainer(whoIsAsking) {
  const container = createNewElement("div", "small-margin-left",'', whoIsAsking+"req");
  const name = createNewElement("div", "bold", whoIsAsking);
  const button = createNewElement("button", "main-button", "Confirmar");
  button.addEventListener("click", () => acceptFriend(whoIsAsking));
  container.append(name);
  container.append(button);
  return container;
}


function acceptFriend(whoIsAsking) {
  const obj = {emailOrNumber:whoIsAsking}
  $.post("/acceptFriends", obj, (done) => {
    if(done) {
      document.getElementById(whoIsAsking+'req').remove();
      const friendBoxLeft = document.querySelectorAll("friend-request-box");
      if(friendBoxLeft.length === 0) $("#friend-request-container").hide();
      whoIsAsking = [whoIsAsking];
      putFriendsInChat(whoIsAsking);
      return;
    }
    console.log("erro");
  });
}