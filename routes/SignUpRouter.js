
var express = require('express');
var router = express.Router();
let path = require('path');
var app=express();

const Users = require('../model')("Users");
router.use(express.static(path.join(__dirname, '../public')));
app.set('views', '../views');
app.set('view engine', 'ejs');


function initDB() {

  var users = [
    {image:'person1',
    userID:'208682864',
    userName:"oria",
    surName:'cohen',
    permission:'Employee',
    branch:'Jerusalem',
    birthYear:1997},
  {image:'person2',
  userID:'229456857',
  userName:"noam",
  surName:'brauner',
  permission:'Provider',
  branch:'TelAviv',
  birthYear:1996},
  {image:'person3',
  userID:'350986752',
  userName:"Chai",
  surName:'levy',
  permission:'Manager',
  branch:'BeerSheva',
  birthYear:2000},
  {image:'person4',
  userID:'869574356',
  userName:"gila",
  surName:'moshe',
  permission:'Client',
  branch:'TelAviv',
  birthYear:1998}
  ];
  
  
  users.forEach((element) =>
    Users.CREATE(element)
  );
  console.log("initDB");
  }




  
  router.post('/signUpUserNew', async function(req, res) {
    console.log(" from server function signUp")
    console.log(req.body.userToAdd.userID);
    let myuserID= req.body.userToAdd.userID; 
    //let myimage= req.body.userToAdd.image; 
    let mypassword=req.body.userToAdd.password
   let myuserName = req.body.userToAdd.firstName;
    let myuserSurname= req.body.userToAdd.lastName; 
    let mypermission= req.body.userToAdd.permission; 
    //let mybranch= req.body.userToAdd.branch; 
    let mybirthYear= req.body.userToAdd.birthYear; 

     console.log(myuserID);
     
    userToAdd={ userID:myuserID  ,password:mypassword, userName:myuserName,surName:myuserSurname, permission:mypermission,  birthYear:mybirthYear};
   console.log(userToAdd);
    await Users.CREATE(userToAdd);
    // listUsers.push(userToAdd);

  });
    




module.exports = router;
