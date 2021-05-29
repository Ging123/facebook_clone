function generateArrayOfNumbers(firstNumber = 0, lastNumber = 0) {
  const length = lastNumber - firstNumber;
  let numbers = new Array(length);
  for(let i = 0; i <= length; i++) {
    numbers[i] = firstNumber;
    firstNumber++;
  }
  return numbers;
}

/*FUNÇÕES PARA MANIPULAR A VISIBILIDADE DO CONTAINER DE SE REGISTRAR*/
function showSinginContainer() {
  $("#singin-hover").show();
  $("#singin-container").show();
}

function makeSinginContainerInvisible() {
  $("#singin-hover").hide();
  $("#singin-container").hide();
}

/*FUNÇÕES PARA CRIAR DATA DE NASCIMENTO*/
function createDaysOptionsOfSelectTag() {
  const selectTag = document.querySelector("#day");
  const days = generateArrayOfNumbers(1, 31);
  const optionTag = createOptionTag(days);
  append(selectTag, optionTag);
}

function createMonthsOptionsOfSelectTag() {
  const selectTag = document.querySelector("#month");
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
  "Julho", "Agosto", "Setembro", "Outubro", "novembrom", "Dezembro"];
  const optionTag = createOptionTag(months);
  append(selectTag, optionTag);
}

function createYearsOptionsOfSelectTag() {
  const selectTag = document.querySelector("#year");
  const currentYear = getCurrentYear(); 
  const maxYearToBeBorn = getCurrentYear() - 120;
  const years = generateArrayOfNumbers(maxYearToBeBorn, currentYear);
  const optionTag = createOptionTag(years.reverse());
  append(selectTag, optionTag);
}

function getCurrentYear() {
  const d = new Date();
  return d.getFullYear();
}

//FUNÇÕES PARA MANIPULAR A VISIBILIDADE DO INPUT DE PERSONALIZAR GÊNERO
const showInputForEditGender = () => $("#custom-gender-input").show();
const hideInputForEditGender = () => $("#custom-gender-input").hide();


createDaysOptionsOfSelectTag();
createYearsOptionsOfSelectTag();
createMonthsOptionsOfSelectTag();