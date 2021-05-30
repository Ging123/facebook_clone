function registerUser(e) {
  e.preventDefault();
  const user = getUserSinginData();
  $.post("/singin", user, (erroMessage) => {
    if(erroMessage !== "") return showErroMensageInSignin(erroMessage);
    hideErroMensageInSingin();
  });
}


function showErroMensageInSignin(erroMessage) {
  const singinElement = $("#singinErroMensage");
  singinElement.text(erroMessage);
  singinElement.show();
}

function hideErroMensageInSingin() {
  $("#singinErroMensage").hide();
  eraseAllDataInTheSinginInput();
  makeSinginContainerInvisible();
}


function eraseAllDataInTheSinginInput() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#cellphoneOrEmail").value = "";
  document.querySelector("#singPassword").value = "";
  document.querySelector("#day").value = "1";
  document.querySelector("#month").value = "Janeiro";
  document.querySelector("#year").value = "2020";
  document.querySelector("#custom-gender-input").value = "";
  const genders = document.getElementsByName("gender");
  for(let i = 0; i < genders.length; i++) {
    genders[i].checked = false;
  }
  hideInputForEditGender();
}


function getUserSinginData() {
  return {
    firstName:document.querySelector("#firstName").value,
    lastName:document.querySelector("#lastName").value,
    cellphoneOrEmail:document.querySelector("#cellphoneOrEmail").value,
    password:document.querySelector("#singPassword").value,
    day:document.querySelector("#day").value,
    month:document.querySelector("#month").value,
    year:document.querySelector("#year").value,
    gender:getUserGender()
  }
}


function getUserGender() {
  const genders = document.getElementsByName("gender");
  for(let i = 0; i < genders.length; i++) {
    if(genders[i].checked) return verifyIfGenderCustom(genders[i].value)
  }
  return "";
}


function verifyIfGenderCustom(gender = "") {
  if(gender === "personalizado") {
    return document.querySelector("#custom-gender-input").value;
  }
  return gender;
}

document.getElementById("singin-form-container").addEventListener("submit", registerUser);