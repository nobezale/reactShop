/*var express = require('express');
var router = express.Router();

/* GET users listing. *
router.get('/', function(req, res, next) {
  res.json([{'image':'VelvetAntiquePink','productID':'123','productName':"Velvet antique pink",'productType':'Scraf','unitsInStock':20,'sale':'Yes'},
  {'image':'nectar','productID':'257','productName':"nectar",'productType':'Scraf','unitsInStock':10,'sale':'No'},
  {'image':'Lucy','productID':'865','productName':"Lucy",'productType':'Scraf','unitsInStock':14,'sale':'Yes'},
  {'image':'SquareScarf','productID':'987','productName':"Square Scarf",'productType':'Scraf','unitsInStock':6,'sale':'No'},
  {'image':'sea','productID':'265','productName':"sea",'productType':'Dress','unitsInStock':9,'sale':'No'},
  ]);
});

module.exports = router;
*/


var express = require('express');
let path = require('path');
var router = express.Router();
var app=express();

const Products = require('../model')("Products");
router.use(express.static(path.join(__dirname, '../public')));
app.set('views', '../views');
app.set('view engine', 'ejs');


function initDB() {

  var products_ = [
    {
      image:'VelvetAntiquePink',
      productID:'123',
      productName:"Velvet antique pink",
      productType:'Scraf',
      price:'50',
      unitsInStock:20,
      sale:'Yes'
    },
    {
      image:'nectar',
      productID:'257',
      productName:"nectar",
      productType:'Scraf',
      price:'50',
      unitsInStock:10,
      sale:'No'
    },
    {
      image:'Lucy',
    productID:'865',
    productName:"Lucy",
    productType:'Scraf',
    unitsInStock:14,
    sale:'Yes'},
  {
    image:'SquareScarf',
    productID:'987',
    productName:"Square Scarf",
    productType:'Scraf',
    unitsInStock:6,
    sale:'No'},
  {
    image:'sea',
  productID:'265',
  productName:"sea",
  productType:'Dress',
  unitsInStock:9,
  sale:'No'},
   
  ];
  
  
  products_.forEach((element) =>
    Products.CREATE(element)
  );
  console.log("initDB");
  }

router.get('/getAllProduct', async function(req, res) {

   console.log("in router");
   //initDB();
  

    console.log("from list product catalog");
    let listProducts=await Products.REQUEST({});
    console.log("get list product:");
    console.log(listProducts);
    //res.render('ListOfProducts',{listProducts:listProducts});
   res.json(listProducts);

  });

  router.post('/deleteProduct',  async function(req, res) {
    console.log(" from server function deleteProduct")
    let productIDToDelete = req.body.productToDelete.productID;
    console.log(productIDToDelete);
    res.status(200);
    let productfound=await Products.REQUEST({productID:productIDToDelete});
    console.log(productfound);
    console.log(productfound[0].productID);
    let flag=false;
    if(productfound[0]!=null)
    {
       flag=true;
       await Products.DELETE(productfound[0].productID);

    }
    
  if(flag==true)
  {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.status(200).json(productfound);
   // res.json(userfound);
   // res.status(200).send({error: false, message: userfound.permission})
     console.log("deleted");
  }
  else{
   // res.writeHead(404, {'Content-Type': 'text/plain'});
   res.status(400).send({error: true, message: 'the prduct to delete is not found'})
    console.log("error not found product to delete");
      }
  });
  
  router.post('/updateProduct',async function(req, res) {
    console.log(" from server function updateProduct")
    console.log(req.body.productToUpdate);
    let productIDToUpdate = req.body.productToUpdate.productID;
    let productNew= req.body.productNew;
     console.log(productIDToUpdate);
     let flag=0;
     let productfound=await Products.REQUEST({productID:productIDToUpdate});
     if(productfound[0]!=null)
     {
       flag=true;
       await Products.UPDATE(productIDToUpdate, productNew);
     }

  
  if(flag==1)
  {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.status(200).json(productfound);
   // res.json(userfound);
   // res.status(200).send({error: false, message: userfound.permission})
     console.log("updated");
  }
  else{
   // res.writeHead(404, {'Content-Type': 'text/plain'});
   res.status(400).send({error: true, message: 'the product to delete is not found'})
    console.log("error not found product to update");
      }
  });
  
  router.post('/addProduct', async function(req, res) {
    console.log(" from server function addProduct")
    console.log(req.body.productToAdd.productID);
    let myproductID= req.body.productToAdd.productID; 
    let myimage= req.body.productToAdd.image; 
   let myproductName = req.body.productToAdd.productName;
    let myproductType= req.body.productToAdd.productType; 
    let myprice= req.body.productToAdd.price; 
    let myunitsInStock= req.body.productToAdd.unitsInStock; 
    let mysale= req.body.productToAdd.sale; 

     console.log(myproductID);
     
    productToAdd={image: myimage, productID:myproductID  , productName:myproductName,productType:myproductType, price:myprice, unitsInStock:myunitsInStock, sale:mysale};
    let addproduct=await Products.CREATE(productToAdd);
    console.log(addproduct);
    // listUsers.push(userToAdd);
  });
    
  

module.exports = router;

/*
const Products= require('../model')("Products");
const timeout = require("./timeout");
const prompt = require('./prompt');

(async () => {
  console.clear();
  await timeout(500);
  while (true) {
    let product={image:'VelvetAntiquePink',productID:'123',productName:"Velvet antique pink",productType:'Scraf',unitsInStock:20,sale:'Yes'};
   /* console.log();
    flower.name = await prompt("Please enter flower's name: ");
    flower.color = await prompt('Please enter color: ');
    flower.image= await prompt('Please enter image src: ');
    flower.price = await prompt('Please enter price');
    ;

    console.log(product);
    try {
        await Products.CREATE(product);
        console.log('Flower created:' + product);
    } catch(err) { throw err; }
  }
})();
*/








/*router.get('/', async function(req, res) {
  /*console.log("from list flower catalog");
   let listProducts=await Products.REQUEST({});
   console.log("get list flower:");
   console.log(listProducts);
   res.render('ListOfProducts',{listProducts:listProducts});
  
 console.log("in get in router");
 initDB();


 });
*/