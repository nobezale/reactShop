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

 function setCountProduct(listOrder){
     console.log("in SetCountProductDB");
   listOrder.forEach(element => {
    const SetUnitsInStockProductDB = async () => {
      try {
        let productsfound=await Products.REQUEST({productID:element.productID});
        console.log(productsfound);
        let unitsInStockNew= productsfound[0].unitsInStock-element.count;
        console.log(unitsInStockNew);
        await Products.UPDATE_COUNT(element.productID, unitsInStockNew);

      } catch (e) {
          console.log(e);
      }
  };
  SetUnitsInStockProductDB();
   });
 }



router.get('/getSoppingCrat', async function(req, res) {

   console.log("in router");
  // initDB();
  


   var session = req.session;
   console.log(session);
   if(session.userID!=undefined){
   console.log("session in get listOrders");
     let listOrder=await Orders.REQUEST({userID:session.userID, payment:'No'});
     console.log(listOrder);
     //res.render('ListOfProducts',{listProducts:listProducts});
    res.json(listOrder);
   }
   else{
       console.log("userID undefinded")
    res.json([]);

   }

  });


  router.post('/reduction',async function(req, res) {
    console.log(" from server function reduction")
    console.log(req.body.orderToReduction);
    let orderIDToUpdate = req.body.orderToReduction;
     console.log(orderIDToUpdate);
     let flag=0;
     let orderfound=await Orders.REQUEST({_id:orderIDToUpdate});
     console.log(orderfound);
     let countNew= orderfound[0].count-1;
     console.log(countNew);
     let orderNew= {count:countNew}
     if(orderfound[0]!=null)
     {
       flag=true;
       await Orders.UPDATE_COUNT(orderfound[0].orderID, orderNew);
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


  router.post('/increase',async function(req, res) {
    console.log(" from server function reduction")
    console.log(req.body.orderToIncrease);
    let orderIDToUpdate = req.body.orderToIncrease;
     console.log(orderIDToUpdate);
     let flag=0;
     let orderfound=await Orders.REQUEST({_id:orderIDToUpdate});
     console.log(orderfound);
     let countNew= orderfound[0].count+1;
     console.log(countNew);
     let orderNew= {count:countNew}
     if(orderfound[0]!=null)
     {
       flag=true;
       await Orders.UPDATE_COUNT(orderfound[0].orderID, orderNew);
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
  
  router.post('/removeOrders',  async function(req, res) {
    console.log(" from server function deleteOrder")
    let orderIDToRemove = req.body.orderToRemove;
    console.log(orderIDToRemove);
    res.status(200);
    let orderfound=await Orders.REQUEST({_id:orderIDToRemove});
    console.log(orderfound);
    console.log(orderfound.orderID);
    let flag=false;
    if(orderfound[0]!=null)
    {
       flag=true;
       await Orders.DELETE(orderfound.orderID);

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

  router.get('/getPlaceOrder', async function(req, res) {

    console.log("in router");
   // initDB();
   
 
 
    var session = req.session;
    console.log(session);
    if(session.userID!=undefined){
    console.log("session in get listOrders");
      let listOrder=await Orders.REQUEST({userID:session.userID, payment:'No'});
      console.log(listOrder);
      let orderNew={payment:'Yes'};

      await Orders.UPDAET_PAYMENT(session.userID, orderNew);
      setCountProduct(listOrder);


     /* listOrder.forEach(element => {
        let paymentNew='Yes';
        let orderNew={payment:paymentNew};
        await Orders.UPDATE_PAYMENT(element.userID, orderNew);

      });*/

      //res.render('ListOfProducts',{listProducts:listProducts});
     res.status(200);
    }
    else{
        console.log("userID undefinded")
    // res.json(["user not logged in"]);
    res.status(304);
 
    }
 
   });
 

  /*
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
    let myamount= req.body.orderToAdd.amount; 
    let mysale= req.body.orderToAdd.sale; 
    let mypayment= req.body.orderToAdd.payment;
    let myimage= req.body.orderToAdd.image;
     console.log(myorderID);
     
     orderToAdd={orderID:myorderID,userID:myuserID,userName:myuserName, productID:myproductID  , productName:myproductName,productType:myproductType, price:myprice, amount:myamount, sale:mysale, payment:mypayment, image:myimage};
    let addorder=await Orders.CREATE(orderToAdd);
    console.log(addorder);
    // listUsers.push(userToAdd);
  });
    */
  

module.exports = router;