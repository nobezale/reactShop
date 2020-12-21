var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{'productID':'OyJsaB2','productName':"Chai",'unitPrice':18.00,'unitsInStock':39,"unitsOnOrder":0},{'productID':'j0opaSA','productName':"Chang",'unitPrice':19.00,'unitsInStock':17,"unitsOnOrder":40},
      {'productID':'GWCUCrz','productName':"Chef Anton's Gumbo Mix",'unitPrice': 21.35,'unitsInStock':0,"unitsOnOrder":0},


{'productID':'1uwbA7y','productName':"Grandma's Boysenberry Spread",'unitPrice':  25.00,'unitsInStock':120,"unitsOnOrder":0},


{'productID':'cyu1F7h','productName':"Uncle Bob's Organic Dried Pears",'unitPrice': 30.00,'unitsInStock':150,"unitsOnOrder":0},

{'productID':'L9gUDHq','productName':"Northwoods Cranberry Sauce",'unitPrice': 40.00,'unitsInStock':6,"unitsOnOrder":0},

{'productID':'drYXGEe','productName':"Mishi Kobe Niku",'unitPrice': 97.00,'unitsInStock':29,"unitsOnOrder":0},


{'productID':'OoQ9k6x','productName':"Ikura",'unitPrice': 31.00,'unitsInStock':31,"unitsOnOrder":0},


{'productID':'4bPiKdK','productName':"Queso Cabrales",'unitPrice': 21.00,'unitsInStock':22,"unitsOnOrder":30},


{'productID':'9QXH9NM','productName':"Queso Manchego La Pastora",'unitPrice': 38.00,'unitsInStock':86,"unitsOnOrder":0},


      ]);
});

module.exports = router;
