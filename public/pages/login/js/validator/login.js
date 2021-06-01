function login(e) {
  e.preventDefault();
  const user = {
    emailOrNumber:document.querySelector("#emailOrNumberToLogin").value,
    password:document.querySelector("#loginPassword").value
  }
  $.post("/login", user, (erro) => {
    if(erro !== "") return showErroMessageInLogin(erro);
    hideErroMessage();
  });
}


function showErroMessageInLogin(erro) {
  const erroTag = $("#login-erro-message");
  erroTag.show();
  erroTag.text(erro);
}

function hideErroMessage() {
  $("#login-erro-message").hide();
  //CODIGO ABAIXO É APENAS UM CÓDIGO TESTE PARA O SISTEMA DE PESQUISA
  const emailOrNumber = prompt("digite email");
  const searchedUser = {emailOrNumber:emailOrNumber}
  $.post("/acceptFriends", searchedUser, (res) => {
    console.log(res);
  })
}


document.querySelector("#loginForm").addEventListener("submit", login);