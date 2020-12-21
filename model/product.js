const debug = require("debug")("mongo:model-products");
const mongo = require("mongoose");
//const mongodb = require("mongodb")

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({ 
        image:String,
        productID:String,
        productName: String,
        productType: String,
        price: String,
        unitsInStock:Number,
        sale:String,
        meta: {
            age: Number,
            website: String
        },
        created_at: Date,
        updated_at: Date
    }, { autoIndex: false });


    schema.statics.CREATE = async function(product) {
        console.log("add product");
        return this.create({
            image:product.image,
            productID:product.productID,
            productName: product.productName,
            productType: product.productType,
            price: product.price,
            unitsInStock: product.unitsInStock,
            sale:product.sale            
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
            let cursor, product;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (product = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(product);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(product);
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
        let products=[];
        let cursor, product;
        cursor = await this.find(...args).cursor();
        while (null !== (product = await cursor.next())) {
            products.push(product);
        }

        return products;//return all the products
    };



    schema.statics.DELETE = async function(productID) {

        
        db.collection("products").deleteOne({"productID":productID}, function(err, res) {
            if (err) {
            throw err;
            }
            else{
              
                console.log("the product is deleted");
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

    schema.statics.UPDATE = async function(productIDToUpdate,productNew) {
        var flag;
        console.log(productIDToUpdate);
        console.log(productNew);
        var myquery = { productID: productIDToUpdate };
        var newvalues = { $set: 
            {image:productNew.image, 
                productName: productNew.productName,
            productType: productNew.productType,
            price: productNew.price,
            unitsInStock: productNew.unitsInStock,
            sale:productNew.sale } };
            console.log(newvalues);
         db.collection("products").updateOne(myquery, newvalues, function(err, res) {
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

    schema.statics.UPDATE_COUNT = async function(productIDToUpdate,unitsInStockNew) {
        var flag;
        console.log(productIDToUpdate);
        console.log(unitsInStockNew);
        var myquery = { productID: productIDToUpdate };
        var newvalues = { $set: 
            {unitsInStock:unitsInStockNew} };
            console.log(myquery);
            console.log(newvalues);
         db.collection("products").updateOne(myquery, newvalues, function(err, res) {
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

    // the schema is useless so far
    // we need to create a model using it
    // db.model('Products', schema, 'Products'); // (model, schema, collection)
    db.model('Products', schema); // if model name === collection name
    debug("products model created");
};