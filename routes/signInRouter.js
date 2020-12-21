/*const express = require('express');
const router = express.Router();
const User = require('../model')("user");
const debug = require('debug')('lab7:login');

/*router.get('/', async (req, res) => {
    if (req.session.userId === undefined) {
        req.session.referer = req.get('Referer');
        if (req.session.referer === undefined)
            req.session.referer = '/';
        res.render("login", {title: "Login", problem: req.session.badLogin});
    }
    else
        res.redirect('/');
});
*
router.post('/signInUser', async (req, res) => {
    console.log("in login router");
    var session = req.session;
    let user;
    try {
        user = await User.findOne({userID: req.body.userToLogin.userID}).exec();
    } catch (err) {
        debug(`Login error: ${err}`);
        session.badLogin = "Login error";
        res.redirect(req.session.referer);
        return;
    }
    if (user === null || user.password !== req.body.password) {
        debug(`Login no user: ${req.body.user}`);
        session.badLogin = `User '${req.body.user}' or its password aren't correct`;
        res.redirect(req.session.referer);
        return;
    }
    debug(`Logged to: ${user.username}`);
    delete session.badLogin;
    session.userId = user.id;
    session.admin = user.admin;
    session.userName = user.name;
    session.count = 0;
    res.redirect(req.session.referer);
});

module.exports = router;
*/


var express = require('express');
var router = express.Router();
let path = require('path');
var app=express();


const Users = require('../model')("Users");
router.use(express.static(path.join(__dirname, '../public')));
app.set('views', '../views');
app.set('view engine', 'ejs');

const checksession = require('./checksession');




router.get('/getPermissionUser',checksession, async function(req, res) {

    console.log("in get permission from router");
   // initDB();
   
   var session = req.session;
   console.log(session);
   if(session.userID!=undefined){
   console.log("session in get permission");
     let user=await Users.REQUEST({userID:session.userID});
     console.log(user);
     //res.render('ListOfProducts',{listProducts:listProducts});
    res.json([user[0].permission, user[0].userID, user[0].userName]);
   }
   else{
       console.log("userID undefinded")
    res.json(["client", null,'']);

   }
 
   });
 

   

  router.post('/signInUser', async (req, res) => {
    console.log("in login router");
    var session = req.session;
    console.log(session);

    let user;
    console.log(req.body.userToLogin.ID);
    try {
       // user = await Users.findOne({userID: req.body.userToLogin.userID}).exec();
       user= await Users.REQUEST({userID: req.body.userToLogin.ID});
        console.log(user);
    } catch (err) {
     //   debug(`Login error: ${err}`);
     console.log("in catch");
        session.badLogin = "Login error";
     //   res.status(304);
        res.redirect(req.session.referer);
        return;
    }
    if (user[0] === null || user[0].password !== req.body.userToLogin.password) {
       // debug(`Login no user: ${req.body.user}`);
       console.log("password are not correct");
       console.log(user[0].password);
        session.badLogin = `User '${req.body.user}' or its password aren't correct`;
        res.status(304).json(user[0]);
     //  res.status(304).json(["password are not correct"]);
     //   res.redirect(req.session.referer);
     
        return;
    }
  //  debug(`Logged to: ${user.username}`);
    delete session.badLogin;
    session.userID = user[0].userID;
    //session.admin = user.admin;
    session.userName = user[0].userName;
    session.count = 0;
    console.log(session);
    console.log("signin exp");
 //   res.cookie('userID', user[0].userID, { signed: true, httpOnly: true });

   // consol.log(req.session.referer);
   res.status(200).json(["signin exp"]);
  //sendPermissionUser(user[0].permission);
   // res.redirect(req.session.referer);
   
});


/*router.get('/getSignOut',checksession, async function(req, res) {

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
 
   });*/
 

module.exports = router;
