const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const {validateIfIsName, validatePassword, validateYearsOld, 
validateGender, validateEmailOrNumber, insertUserInDataBase
} = require("../service/singin/main");

router.use(formidable());

router.post("/", (req, res, next) => {
  const user = req.fields;
  const firstNameErro = validateIfIsName(user.firstName, "Nome");
  const lastNameErro = validateIfIsName(user.lastName, "sobrenome");
  const passwordErro = validatePassword(user.password);
  const genderErro = validateGender(user.gender);
  if(firstNameErro !== "") return res.send(firstNameErro);
  if(lastNameErro !== "") return res.send(lastNameErro);
  if(passwordErro !== "") return res.send(passwordErro);
  if(genderErro !== "") return res.send(genderErro);
  next();
});


router.post("/", (req, res, next) => {
  const user = req.fields;
  const day = parseInt(user.day);
  const year = parseInt(user.year);
  const yearsOldErro = validateYearsOld(day, user.month, year);
  if(yearsOldErro !== "") return res.send(yearsOldErro);
  next();
});


router.post("/", (req, res, next) => {
  const user = req.fields;
  validateEmailOrNumber(user.cellphoneOrEmail).then((erroMensage) => {
    if(erroMensage !== "") return res.send(erroMensage);
    next();
  });
});


router.post("/", (req, res) => {
  const user = req.fields;
  insertUserInDataBase(user).then(() => {res.send("")});
});

module.exports = router;