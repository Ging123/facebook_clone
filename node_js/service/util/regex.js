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

module.exports = {validateRegexp, textIsTooBig, textIsTooSmall};