var express = require('express');
var router = express.Router();
const checksession = require('./checksession');


/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.json([{'image':'person1','userID':'208682864','userName':"oria",'surname':'cohen','permission':'Employee','branch':'Jerusalem','birthYear':1997},
  {'image':'person2','userID':'229456857','userName':"noam",'surname':'brauner','permission':'Provider','branch':'TelAviv','birthYear':1996},
  {'image':'person3','userID':'350986752','userName':"Chai",'surname':'levy','permission':'Manager','branch':'BeerSheva','birthYear':2000},
  {'image':'person4','userID':'869574356','userName':"gila",'surname':'moshe','permission':'Client','branch':'TelAviv','birthYear':1998}]);
});
*/


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

router.get('/getAllUser', async function(req, res) {

   console.log("in router");
  // initDB();
  

   console.log("from list user");
    let listUsers=await Users.REQUEST({});
    console.log("get list user:");
    console.log(listUsers);
    //res.render('ListOfProducts',{listProducts:listProducts});
   res.json(listUsers);

  });


  router.post('/deleteUser',checksession,  async function(req, res) {
    console.log(" from server function deleteUser")
    let userIDToDelete = req.body.userToDelete.userID;
    console.log(userIDToDelete);
    res.status(200);
    let userfound=await Users.REQUEST({userID:userIDToDelete});
    console.log(userfound);
    let flag=false;
    if(userfound[0]!=null)
    {
       flag=true;
       await Users.DELETE(userfound);

    }
    
  if(flag==true)
  {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.status(200).json(userfound);
   // res.json(userfound);
   // res.status(200).send({error: false, message: userfound.permission})
     console.log("deleted");
  }
  else{
   // res.writeHead(404, {'Content-Type': 'text/plain'});
   res.status(400).send({error: true, message: 'the user to delete is not found'})
    console.log("error not found user to delete");
      }
  });
  
  router.post('/updateUser',async function(req, res) {
    console.log(" from server function updateUser")
    console.log(req.body.userToUpdate);
    let userIDToUpdate = req.body.userToUpdate.userID;
    let userNew= req.body.userNew;
     console.log(userIDToUpdate);
     let flag=0;
     let userfound=await Users.REQUEST({userID:userIDToUpdate});
     if(userfound[0]!=null)
     {
       flag=true;
       await Users.UPDATE(userIDToUpdate, userNew);
     }

  
  if(flag==1)
  {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.status(200).json(userfound);
   // res.json(userfound);
   // res.status(200).send({error: false, message: userfound.permission})
     console.log("updated");
  }
  else{
   // res.writeHead(404, {'Content-Type': 'text/plain'});
   res.status(400).send({error: true, message: 'the user to delete is not found'})
    console.log("error not found user to update");
      }
  });
  
  router.post('/addUser', async function(req, res) {
    console.log(" from server function addUser")
    console.log(req.body.userToAdd);
    let myuserID= req.body.userToAdd.userID; 
    let myimage= req.body.userToAdd.image; 
   let myuserName = req.body.userToAdd.userName;
    let myuserSurname= req.body.userToAdd.surName; 
    let mypermission= req.body.userToAdd.permission; 
    let mybranch= req.body.userToAdd.branch; 
    let mybirthYear= req.body.userToAdd.birthYear; 

     console.log(myuserID);
     
    userToAdd={image: myimage, userID:myuserID  , userName:myuserName,surName:myuserSurname, permission:mypermission, branch:mybranch, birthYear:mybirthYear};
   console.log(userToAdd);
    await Users.CREATE(userToAdd);
    // listUsers.push(userToAdd);
  });
    




module.exports = router;
