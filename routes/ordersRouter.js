var express = require('express');
let path = require('path');
var router = express.Router();
var app=express();

const Orders = require('../model')("Orders");
const Products = require('../model')("Products");

router.use(express.static(path.join(__dirname, '../public')));
app.set('views', '../views');
app.set('view engine', 'ejs');


function initDB() {

  var orders_ = [
    {
        orderID:'952',
        userID:'456789',
        userName:'raya',
        productID:'1111',
        productName: 'Laguna',
        productType: 'Dress',
        price: '65',
        count: 2,
        sale:'Yes',
        payment:'No',   
        image:'dress2'      
    },
    {
        orderID:'963',
        userID:'229456857',
        userName:'noam',
        productID:'1111',
        productName: 'Laguna',
        productType: 'Dress',
        price: '65',
        count: 2,
        sale:'Yes',
        payment:'No',
        image: 'dress2'
    },
    {
        orderID:'157',
        userID:'350986752',
        userName:'chai',
        productID:'1212',
        productName: 'Opera',
        productType: 'Dress',
        price: '102',
        count: 1,
        sale:'Yes',
        payment:'No',
        image:'dress3'
      
      },
  {
    orderID:'169',
    userID:'208682864',
    userName:'oria',
    productID:'1212',
    productName: 'Opera',
    productType: 'Dress',
    price: '65',
    count: 2,
    sale:'Yes',
    payment:'No',
    image:'dress3'
  },
  {
    orderID:'168',
    userID:'208682864',
    userName:'oria',
    productID:'1313',
    productName: 'Shemesh',
    productType: 'Dress',
    price: '100',
    count: 1,
    sale:'Yes',
    payment:'No',
    image:'dress4'
  },
   
  ];
  
  
  orders_.forEach((element) =>
    Orders.CREATE(element)
  );
  console.log("initDB");
  }

router.get('/getAllOrders', async function(req, res) {

   console.log("in router");
  // initDB();
  

    console.log("from list orders");
    let listOrder=await Orders.REQUEST({});
    console.log("get list order:");
    console.log(listOrder);
    //res.render('ListOfProducts',{listProducts:listProducts});
   res.json(listOrder);

  });

  router.post('/deleteOrder',  async function(req, res) {
    console.log(" from server function deleteOrder")
    let orderIDToDelete = req.body.orderToDelete.orderID;
    console.log(orderIDToDelete);
    res.status(200);
    let orderfound=await Orders.REQUEST({orderID:orderIDToDelete});
    console.log(orderfound);
    console.log(orderfound[0].orderID);
    let flag=false;
    if(orderfound[0]!=null)
    {
       flag=true;
       await Orders.DELETE(orderfound[0].orderID);

    }
    
  if(flag==true)
  {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.status(200).json(orderfound);
   // res.json(userfound);
   // res.status(200).send({error: false, message: userfound.permission})
     console.log("deleted");
  }
  else{
   // res.writeHead(404, {'Content-Type': 'text/plain'});
   res.status(400).send({error: true, message: 'the order to delete is not found'})
    console.log("error not found order to delete");
      }
  });
  
  router.post('/updateOrder',async function(req, res) {
    console.log(" from server function updateOrder")
    console.log(req.body.orderToUpdate);
    let orderIDToUpdate = req.body.orderToUpdate.orderID;
    let orderNew= req.body.orderNew;
     console.log(orderIDToUpdate);
     let flag=0;
     let orderfound=await Orders.REQUEST({orderID:orderIDToUpdate});
     if(orderfound[0]!=null)
     {
       flag=true;
       await Orders.UPDATE(orderIDToUpdate, orderNew);
     }

  
  if(flag==1)
  {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.status(200).json(orderfound);
   // res.json(userfound);
   // res.status(200).send({error: false, message: userfound.permission})
     console.log("updated");
  }
  else{
   // res.writeHead(404, {'Content-Type': 'text/plain'});
   res.status(400).send({error: true, message: 'the order to delete is not found'})
    console.log("error not found order to update");
      }
  });
  
  router.post('/addOrder', async function(req, res) {
    console.log(" from server function addOrder")
    console.log(req.body.orderToAdd.orderID);
      

    let myorderID =req.body.orderToAdd.orderID;
    let myuserID= req.body.orderToAdd.userID;
    let myuserName= req.body.orderToAdd.userName; 
    let myproductID= req.body.orderToAdd.productID; 
   let myproductName = req.body.orderToAdd.productName;
    let myproductType= req.body.orderToAdd.productType; 
    let myprice= req.body.orderToAdd.price; 
    let mycount= req.body.orderToAdd.count; 
    let mysale= req.body.orderToAdd.sale; 
    let mypayment= req.body.orderToAdd.payment;
    let myimage= req.body.orderToAdd.image;
     console.log(myorderID);
     
     orderToAdd={orderID:myorderID,userID:myuserID,userName:myuserName, productID:myproductID  , productName:myproductName,productType:myproductType, price:myprice, count:mycount, sale:mysale, payment:mypayment, image:myimage};
    let addorder=await Orders.CREATE(orderToAdd);
    console.log(addorder);
    // listUsers.push(userToAdd);
  });
  
  router.post('/addOrderProduct', async function(req, res) {
    console.log(" from server function addOrder")
    console.log(req.body.productID);
    let productid=req.body.productID;
    let productfound=await Products.REQUEST({productID:productid});
    let listOrder=[];
     listOrder= await Orders.REQUEST({});
console.log(listOrder[listOrder.length-1])
    console.log("product found");
    console.log(productfound);
    var session = req.session;
    console.log(session);
   if(session.userID!=undefined){
    let orderIdOld;
     if(listOrder.length==0)
     {
      orderIdOld=0;
     }
     else{
    orderIdOld=Number(listOrder[listOrder.length-1].orderID);
     }
     console.log(orderIdOld);
    let myorderID =orderIdOld+1;
    let myuserID= session.userID;
    let myuserName= session.userName; 
    let myproductID= productfound[0].productID; 
   let myproductName = productfound[0].productName;
    let myproductType= productfound[0].productType; 
    let myprice= productfound[0].price; 
    let mycount= 1; 
    let mysale= productfound[0].sale; 
    let mypayment= 'No';
    let myimage= productfound[0].image;
    console.log(myorderID);
     
    orderToAdd={orderID:myorderID,userID:myuserID,userName:myuserName, productID:myproductID  , productName:myproductName,productType:myproductType, price:myprice, count:mycount, sale:mysale, payment:mypayment, image:myimage};
   let addorder=await Orders.CREATE(orderToAdd);
   console.log(addorder);


   var session = req.session;
   console.log(session.userID);
   listOrderUser= await Orders.REQUEST({userID: session.userID, payment:"No"});
   let countCart=listOrderUser.length;
   res.json([countCart]);
   }
   
   
    // listUsers.push(userToAdd);
  });

module.exports = router;