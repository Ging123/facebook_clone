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
  window.location.href = "/";
}


document.querySelector("#loginForm").addEventListener("submit", login);