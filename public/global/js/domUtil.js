//ESSA É UMA PEQUENA LIB QUE EU FIZ PARA PODER AJUDAR NA MANIPULAÇÃO DE DOM

//METODOS PARA CRIAÇÃO DE ELEMENTOS
function createNewElement(tag = "", classes = "", content = "") {
  let newElement = document.createElement(tag);
  newElement.classList = classes;
  newElement.textContent = content;
  return newElement;
}


function createOptionTag(optionValue = []) {
  const length = optionValue.length;
  const optionTag = new Array(length);
  for(let i = 0; i < length; i++) {
    optionTag[i] = document.createElement("option");
    optionTag[i].value = optionValue[i];
    optionTag[i].textContent = optionValue[i];
  }
  return optionTag;
}

//METODO PARA UNIÃO DE ELEMENTO
//OBSERVAÇÃO: ESSE MÉTODO APENAS FUNCIONA SE O "elementChild" FOR UM "ARRAY"
function append(elementFather, elementChild = []) {
  for(let i = 0; i < elementChild.length; i++) {
    elementFather.appendChild(elementChild[i]);
  }
}