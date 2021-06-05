function openChat(friend) {
  hideMessageBar();
  document.getElementById("friendEmail").textContent = friend;
  $("#chat-box").show();
}


const closeChat = () => $("#chat-box").hide();
