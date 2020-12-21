
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

router.get('/getAllProductInSale', async function(req, res) {

   console.log("in router");
 //  initDB();


  console.log("from list product in sale");
    let listProductsInSale=await Products.REQUEST({sale:'Yes'});
    console.log("get list product in sale:");
    console.log(listProductsInSale);
    //res.render('ListOfProducts',{listProducts:listProducts});
   res.json(listProductsInSale);
  });

 
  

module.exports = router;
