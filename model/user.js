const debug = require("debug")("mongo:model-users");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({ 
        image:String,
        userID:String,
        password:String,
        userName: String,
        surName: String,
        permission: String,
        branch:String,
        birthYear:Number,
        meta: {
            age: Number,
            website: String
        },
        created_at: Date,
        updated_at: Date
    }, { autoIndex: false });

    schema.statics.CREATE = async function(user) {
        return this.create({
            image:user.image,
            userID:user.userID,
            password:user.password,
            userName: user.userName,
            surName: user.surName,
            permission: user.permission,
            branch: user.branch,
            birthYear:user.birthYear            
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
            let cursor, user;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (user = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(user);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(user);
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
        let users=[];
        let cursor, user;
        cursor = await this.find(...args).cursor();
        while (null !== (user = await cursor.next())) {
            users.push(user);
        }

        return users;//return all the users
    };

    
    schema.statics.DELETE = async function(user) {
        console.log("in model user delete user");
        console.log(user);
        console.log(user[0]._id);
        db.collection("users").deleteOne({"_id":user[0]._id}, function(err, res) {
            if (err) {
            throw err;
            }
            else{
              
                console.log("the user is deleted");
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

    schema.statics.UPDATE = async function(userIDToUpdate,userNew) {
        var flag;
        console.log(userIDToUpdate);
        console.log(userNew);
        var myquery = { userID: userIDToUpdate };
        var newvalues = { $set: 
            {image:userNew.image, 
                userName: userNew.userName,
            surName: userNew.surName,
            permission: userNew.permission,
            branch: userNew.branch,
            birthYear:userNew.birthYear } };

            console.log(newvalues);
         db.collection("users").updateOne(myquery, newvalues, function(err, res) {
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
     /*   let currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;*/
        next();
    });


    // the schema is useless so far
    // we need to create a model using it
    // db.model('Products', schema, 'Products'); // (model, schema, collection)
    db.model('Users', schema); // if model name === collection name
    debug("users model created");
};