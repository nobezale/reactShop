var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{'image':'person1','userID':'208682864','userName':"oria",'surname':'cohen','permission':'Employee','branch':'Jerusalem','birthYear':1997},
  {'image':'person2','userID':'229456857','userName':"noam",'surname':'brauner','permission':'Provider','branch':'TelAviv','birthYear':1996},
  {'image':'person3','userID':'350986752','userName':"Chai",'surname':'levy','permission':'Manager','branch':'BeerSheva','birthYear':2000},
  {'image':'person4','userID':'869574356','userName':"gila",'surname':'moshe','permission':'Client','branch':'TelAviv','birthYear':1998}]);
});

module.exports = router;
