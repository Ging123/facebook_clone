const {validateRegexp, textIsTooBig, textIsTooSmall} = require("../util/regex");
const {hasEqual, insertUser} = require("../../database/database");

//METODO PARA VALIDAR NOME DO USUARIO
function validateIfIsName(text = "", textName) {
  const isAValidName = validateRegexp(text, /[\W_]/g);
  if(text === "") return `erro: ${textName} não foi preenchido`;
  if(textIsTooBig(text, 49)) return `erro: ${textName} é muito grande`; 
  if(isAValidName === false) return `erro: ${textName} inválido`; 
  return "";
}

//METODO PARA VALIDAR A SENHA DO USUARIO
function validatePassword(password = "") {
  if(textIsTooSmall(password, 6)) return `erro: sua senha é muito pequena`;
  if(textIsTooBig(password, 49)) return `erro: sua senha é muito grande`;
  return "";
}

//METODOS PARA VALIDAR A IDADE DO USUARIO
function validateYearsOld(day, month, year) {
  const minYearsOld = 13;
  const maxYearsOld = 120;
  const maxYear = getCurrentYear() - minYearsOld;//Ano minimo para o usuario ter nascido
  const minYear = getCurrentYear() - maxYearsOld;
  if(year > maxYear) return "erro: você não tem a idade mínima para usar o app";
  if(year < minYear) return "erro: idade inválida";
  if(year === maxYear) return validateMonth(month, day);
  return "";
}


function validateMonth(month, day) {
  month = transformMonthInIndex(month);
  currentMonth = getCurrentMonth();
  if(month > currentMonth) return "erro: você não tem a idade mínima para usar o app";
  if(month === currentMonth) return validateDay(day);
  return "";
}


function validateDay(day) {
  const currentDay = getCurrentDay();
  if(day < currentDay) return "erro: você não tem a idade mínima para usar o app";
  return "";
}


function transformMonthInIndex(month) {
  const monthArray = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
  "Julho", "Agosto", "Setembro", "Outubro", "novembrom", "Dezembro"];
  for(let i = 0; i < monthArray.length; i++) {
    if(month === monthArray[i]) return i;
  }
}


function getCurrentYear() {
  const d = new Date();
  return d.getFullYear();
}


function getCurrentMonth() {
  const d = new Date();
  return d.getMonth();
}


function getCurrentDay() {
  const d = new Date();
  return d.getDate();
}

//METODOS PARA VALIDAR O GÊNERO DO USUARIO
function validateGender(gender = "") {
  if(gender === "") return "erro: gênero inválido";
  if(textIsTooBig(gender, 49)) return "erro: gênero muito grande";
  return "";
}

//METODOS PARA VALIDAR O EMAIL OU NÚMERO DE TELEFONE
async function validateEmailOrNumber(emailOrNumber = "") {
  const erroEmptyString = "erro: preencha o campo de email ou número de telefone";
  if(emailOrNumber === "") return erroEmptyString;
  const emailOrNumberErro = validateFormatOfEmailOrNumber(emailOrNumber);
  if(emailOrNumberErro !== "") return emailOrNumberErro;
  return await seeIfEmailOrNumberAlredyExist(emailOrNumber);
}


function validateFormatOfEmailOrNumber(emailOrNumber = "") {
  const erroMensage = "Seu email ou número foi digitado errado";
  const emailRegex = /^\w+@{1}(outlook|hotmail|gmail)\.com{1}$/; 
  const isAnInvalidNumber = validateRegexp(emailOrNumber, /^\d{9}$/);
  const isAnInvalidEmail = validateRegexp(emailOrNumber, emailRegex);
  if(isAnInvalidEmail && isAnInvalidNumber) return erroMensage;
  return "";
}


async function seeIfEmailOrNumberAlredyExist(emailOrNumber = "") {
  const erroDuplicateValue = "erro: esse email ou número de telefone já está sendo usado";
  const search = new Promise((resultOfSearch) => {
    hasEqual(emailOrNumber, "email_or_celphone").then((alredyExist) => {
      if(alredyExist) return resultOfSearch(erroDuplicateValue);
      resultOfSearch("");
    });
  });
  return await search;
}

//METODO PARA REGISTRAR USUARIO NO SISTEMA
async function insertUserInDataBase(data) {
  const user = createUserObjectToSendToDataBase(data);
  return await insertUser(user);
}


function createUserObjectToSendToDataBase(data) {
  const month = transformMonthInIndex(data.month);
  return {
    fullname:`${data.firstName} ${data.lastName}`,
    emailOrCellphone:data.cellphoneOrEmail,
    password:data.password,
    birthday:`${data.year}-${month}-${data.day}`,
    gender:data.gender
  }
}



module.exports = {validateIfIsName, validatePassword, validateYearsOld, 
validateGender, validateEmailOrNumber, insertUserInDataBase};