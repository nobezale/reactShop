/*var express = require('express');
var router = express.Router();

/* GET users listing. *
router.get('/', function(req, res, next) {
  res.json([


{'productID':'1234','productName':"Pastora",'unitPrice': 38,'unitsInStock':86,'imageName':"dress1.jpg"},
{'productID':'1111','productName':"Laguna",'unitPrice': 65,'unitsInStock':70,'imageName':"dress2.jpg"},
{'productID':'1212','productName':"Opera",'unitPrice': 102,'unitsInStock':46,'imageName':"dress3.jpg"},
{'productID':'1313','productName':"Shemesh",'unitPrice': 100,'unitsInStock':96,'imageName':"dress4.jpg"},
{'productID':'12345','productName':"Ginraltar",'unitPrice': 28,'unitsInStock':86,'imageName':"dress5.jpg"},
{'productID':'11115','productName':"Shiny",'unitPrice': 45,'unitsInStock':70,'imageName':"dress6.jpg"},
{'productID':'12125','productName':"Vered",'unitPrice': 12,'unitsInStock':46,'imageName':"dress7.jpg"},
{'productID':'13135','productName':"Simona",'unitPrice': 10,'unitsInStock':96,'imageName':"dress8.jpg"},
{'productID':'13136','productName':"Lisa",'unitPrice': 18,'unitsInStock':76,'imageName':"dress9.jpg"}
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
      price:'100',
      unitsInStock:14,
      sale:'Yes'},
    {
      image:'SquareScarf',
      productID:'987',
      productName:"Square Scarf",
      productType:'Scraf',
      price:'70',
      unitsInStock:6,
      sale:'No'},


];
  
  
  products_.forEach((element) =>
    Products.CREATE(element)
  );
  console.log("initDB");
  }

router.get('/getAllScraf', async function(req, res) {

   console.log("in router");
 //  initDB();


  console.log("from list product catalog");
    let listProducts=await Products.REQUEST({productType:'Scraf'});
    console.log("get list product:");
    console.log(listProducts);
    //res.render('ListOfProducts',{listProducts:listProducts});
   res.json(listProducts);
  });

 
  

module.exports = router;
