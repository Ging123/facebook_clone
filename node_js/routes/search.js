const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const {searchByUser, getSearchedUserFriends, 
createObjectWithDataSearched} = require("../service/search/main");
router.use(formidable());


router.post("/", (req, res, next) => {
  const userData = req.session.user;
  const emailOrNumThatClientWishSearch = req.fields.emailOrNumber;
  //VERIFY IF CLIENT THAT IS MAKING THE SEARCH IS LOGIN
  if(userData === undefined) return res.redirect("/");
  if(emailOrNumThatClientWishSearch === userData.emailOrCellphone) {
    return res.send("");//AQUI DEVE RETORNAR PARA PÁGINA INICIAL DO USUARIO
  }
  next();
});

//DO SEARCH IF THE CLIENT IS LOGIN
router.post("/", (req, res) => {
  const emailOrNumThatClientWishSearch = req.fields.emailOrNumber;
  const emailOrCellphoneOfClient = req.session.user.emailOrCellphone;
  searchByUser(emailOrNumThatClientWishSearch).then((dataFounded) => {
    if(dataFounded === "") return res.send("");
    getSearchedUserFriends(emailOrNumThatClientWishSearch).then((friendsData) => {
      res.send(createObjectWithDataSearched(dataFounded, friendsData, 
      emailOrCellphoneOfClient));
    });
  });
});

module.exports = router;