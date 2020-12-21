
var express = require('express');
var router = express.Router();
let path = require('path');
var app=express();


router.use(express.static(path.join(__dirname, '../public')));
app.set('views', '../views');
app.set('view engine', 'ejs');

const checksession = require('./checksession');



router.get('/getSignOut',checksession, async function(req, res) {

    console.log("in sign Out");
   // initDB();
   
   var session = req.session;
   console.log(session);
   if(session.userID!=undefined){
   console.log("session in get sign out");
   delete session.userID;
   delete session.userName;
     console.log(session);

     //res.render('ListOfProducts',{listProducts:listProducts});
    res.json(["delete session"]);
   }
   else{
       console.log("userID undefinded")
    res.json(["client"]);

   }
 
   });
 

module.exports = router;
