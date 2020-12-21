const debug = require("debug")("mongo:model-orders");
const mongo = require("mongoose");
//const mongodb = require("mongodb")

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({ 
        orderID:String,
        userID:String,
        userName:String,
        productID:String,
        productName: String,
        productType: String,
        price: String,
        count:Number,
        sale:String,
        payment:String,
        image:String,
        meta: {
            age: Number,
            website: String
        },
        created_at: Date,
        updated_at: Date
    }, { autoIndex: false });


    schema.statics.CREATE = async function(order) {
        console.log("add orders");
        return this.create({
        orderID:order.orderID,
        userID:order.userID,
        userName:order.userName,
        productID:order.productID,
        productName: order.productName,
        productType: order.productType,
        price: order.price,
        count:order.count,
        sale:order.sale,
        payment:order.payment,         
        image:order.image
        });
    };

    schema.statics.REQUEST = async function() {
        // no arguments - bring all at once
        const args = Array.from(arguments); // [...arguments]
        if (args.length === 0) {
            debug("request: no arguments - bring all at once");
            return this.find({}).exec();
        }

        // perhaps last argument is a callback for every single document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            debug(`request: with ${asynch?'async':'sync'} callback`);
            args.pop();
            let cursor, order;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (order = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(order);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(order);
                    }
                }
            } catch (err) { throw err; }
            return;
        }

        // request by id as a hexadecimal string
        if (args.length === 1 && typeof args[0] === "string") {
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }

        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`);
        let orders=[];
        let cursor, order;
        cursor = await this.find(...args).cursor();
        while (null !== (order = await cursor.next())) {
            orders.push(order);
        }

        return orders;//return all the products
    };



    schema.statics.DELETE = async function(orderID) {

        
        db.collection("orders").deleteOne({"orderID":orderID}, function(err, res) {
            if (err) {
            throw err;
            }
            else{
              
                console.log("the order is deleted");
            } 
            
        });
            //   db.collection("products").deleteOne(productID);
  /*      var flag;
        var myquery = { name: username };
        var newvalues = { $set: {active:'0'} };
         db.collection("products").updateOne(myquery, newvalues, function(err, res) {
          if (err) {
          throw err;
          }
          else{
            
          console.log("1 document updated");
          }
         
          //db.close();
        });
       // return flag;*/

   //    var collection = db.get().collection('products');
     //  collection.deleteOne({ productID: new mongodb.ObjectId(productID) }, function (err, results) {});
    };

    schema.statics.UPDATE = async function(orderIDToUpdate,orderNew) {
        var flag;
        console.log(orderIDToUpdate);
        console.log(orderNew);
        var myquery = { orderID: orderIDToUpdate };
        var newvalues = { $set: 
            {
           //     orderID:order.orderID,
      //  userID:order.userID,
        userName:orderNew.userName,
        productID:orderNew.productID,
        productName: orderNew.productName,
        productType: orderNew.productType,
        price: orderNew.price,
        count:orderNew.count,
        sale:orderNew.sale,
        payment:orderNew.payment, 
        image:orderNew.image
                 } };
            console.log(newvalues);
         db.collection("orders").updateOne(myquery, newvalues, function(err, res) {
          if (err) {
          throw err;
          }
          else{
            
          console.log("1 document updated");
          }
         
          //db.close();
        });
       // return flag;
    };
    // on every save, add the date
    schema.pre('save', function(next) {
        // get the current date
        let currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;
        next();
    });

    schema.statics.UPDATE_COUNT = async function(orderIDToUpdate,orderNew) {
        var flag;
        console.log(orderIDToUpdate);
        console.log(orderNew);
        var myquery = { orderID: orderIDToUpdate };
        var newvalues = { $set: 
            {
           //     orderID:order.orderID,
      //  userID:order.userID,
        count:orderNew.count,
                 } };
            console.log(newvalues);
         db.collection("orders").updateOne(myquery, newvalues, function(err, res) {
          if (err) {
          throw err;
          }
          else{
            
          console.log("1 document updated");
          }
         
          //db.close();
        });
       // return flag;
    };
    // on every save, add the date
    schema.pre('save', function(next) {
        // get the current date
        let currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;
        next();
    });

    schema.statics.UPDATE_PAYMENT = async function(userIDToUpdate,orderNew) {
        var flag;
     /*   console.log(orderIDToUpdate);
        console.log(orderNew);
        var myquery = { orderID: orderIDToUpdate };
        var newvalues = { $set: 
            {
           //     orderID:order.orderID,
      //  userID:order.userID,
        payment:orderNew.payment,
                 } };
            console.log(newvalues);*/
            console.log(userIDToUpdate);
            console.log(orderNew);
            var myquery = { userID: userIDToUpdate };
            var newvalues = { $set: 
                {
            payment:orderNew.payment,
                     } };
        db.collection("orders").updateMany(myquery, newvalues, function(err, res) {
            if (err) {
            throw err;
            }
            else{
              
            console.log("1 document updated");
            }});
     /*    db.collection("orders").updateOne(myquery, newvalues, function(err, res) {
          if (err) {
          throw err;
          }
          else{
            
          console.log("1 document updated");
          }
         
          //db.close();
        });*/
       // return flag;
    };
    // on every save, add the date
    schema.pre('save', function(next) {
        // get the current date
        let currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;
        next();
    });


    // the schema is useless so far
    // we need to create a model using it
    // db.model('Products', schema, 'Products'); // (model, schema, collection)
    db.model('Orders', schema); // if model name === collection name
    debug("orders model created");
};