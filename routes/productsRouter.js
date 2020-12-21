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

router.get('/', async function(req, res) {

   console.log("in router");
   //initDB();
  

    console.log("from list flower catalog");
    let listProducts=await Products.REQUEST({});
    console.log("get list flower:");
    console.log(listProducts);
    //res.render('ListOfProducts',{listProducts:listProducts});
   res.json(listProducts);

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