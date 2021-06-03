function validateRegexp(text = "", regExp = "") {
  if(text.search(regExp) === -1) return true; //case match regex
  return false;
}


function textIsTooBig(text = "", maxLength = "") {
  if(text.length > maxLength) return true;
  return false;
}


function textIsTooSmall(text = "", minLength) {
  if(text.length < minLength) return true;
  return false;
}


function turnNullInString(text) {
  if(text === null) return "";
  return text;
}


const turnStringInArray = (text = "") => {
  return text.split(" ");
}

function removeValueFromArrayAnTurnInString(array, value) {
  let text = "";
  for(let i = 0; i < array.length; i++) {
    if(array[i] !== value && i < array.length - 1) text += `${array[i]},`;
    if(array[i] !== value && i === array.length - 1) text += `${array[i]}`;
  }
  return text;
}

module.exports = {validateRegexp, textIsTooBig, textIsTooSmall, turnNullInString,
turnStringInArray, removeValueFromArrayAnTurnInString};