var createError = require('http-errors');
var express = require('express');
var path = require('path');
let cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session'); // add session management module
let connectMongo = require('connect-mongo'); // add session store implementation for MongoDB
let debug = require('debug')('shop:app'); // add using the debugger tool
const http = require('http')


const socketIO = require('socket.io')





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var productsRouter = require('./routes/products');
var ListProductsRouter = require('./routes/listProductsRouter');
var dressRouter = require('./routes/dressRouter');
var scrafRouter = require('./routes/scrafRouter');
var saleRouter = require('./routes/saleRouter');
var signUpRouter = require('./routes/signUpRouter');
var signInRouter = require('./routes/signInRouter');
var signOutRouter = require('./routes/signOutRouter');
var ordersRouter = require('./routes/ordersRouter');
var shoppingCartRouter = require('./routes/shoppingCartRouter');



var bodyParser = require('body-parser');



var app = express();

const server = http.createServer(app);
const io = socketIO(server);
let port=4001;

io.on('connection', socket => {
  

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('message', (message) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('message: ', message)
    io.sockets.emit('message', message)
  })

  socket.on('countCart', (countcart) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('countCart: ', countcart)
    io.sockets.emit('countCart', countcart)
  })

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
/*(async () => {
  let MongoStore = connectMongo(session);
  let sessConnStr = "mongodb://localhost/Shop";
  let sessionConnect = mongoose.createConnection();
  try {
      await sessionConnect.openUri(sessConnStr, {useNewUrlParser: true, useUnifiedTopology: true});
  } catch (err) {
      debug(`Error connecting to session backend DB: ${err}`);
      process.exit(0);
  }
  process.on('SIGINT', async () => {
      await sessionConnect.close();
      process.exit(0);
  });
*/

app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/1',express.static(path.join(__dirname, 'lab8-1', 'build')));
app.use('/2',express.static(path.join(__dirname, 'lab8-2', 'build')));
app.use('/shop',express.static(path.join(__dirname, 'lab8-3', 'build')));
app.use('/',express.static(path.join(__dirname, 'material-dashboard-react', 'build')));
app.use('/admin',express.static(path.join(__dirname, 'material-dashboard-react', 'build')));

let secret = 'project shop secret'; // must be the same one for cookie parser and for session
    app.use(cookieParser(secret));

    app.use(session({
        name: 'users.sid',         // the name of session ID cookie
        secret: secret,            // the secret for signing the session ID cookie - mandatory option
        resave: false,             // do we need to resave unchanged session? (only if touch does not work)  - mandatory option
        saveUninitialized: false,  // do we need to save an 'empty' session object? - mandatory option
        
        rolling: true,             // do we send the session ID cookie with each response?
        cookie: { maxAge: 900000, httpOnly: true, sameSite: true }  // cookie parameters
        // NB: maxAge is used for session object expiry setting in the storage backend as well
    }));

//app.use("/admin/ListOfProducts/deleteProduct", express.static(path.join(__dirname, "material-dashboard-react","build")));

//app.use('/deleteProduct',express.static(path.join(__dirname, 'material-dashboard-react', 'build')));

//app.use('/admin/user',express.static(path.join(__dirname, 'material-dashboard-react', 'build')));


app.use("/admin/Home", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/admin/user", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/admin/ListOfProducts", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/admin/DressGallery", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/admin/ScarfGallery", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/admin/Sale", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/admin/AboutUs", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/admin/ContactUs", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/signin", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/LocationView", express.static(path.join(__dirname, "material-dashboard-react","build")));

app.use("/signup", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/signout", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/admin/ListOfOrders", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/admin/shoppingcart", express.static(path.join(__dirname, "material-dashboard-react","build")));
app.use("/admin/payment", express.static(path.join(__dirname, "material-dashboard-react","build")));
//app.use("/admin/Chat", express.static(path.join(__dirname, "material-dashboard-react","build")));


//app.use('/', indexRouter);
app.use('/', usersRouter);
//app.use('/shop/products', productsRouter);
app.use('/', ListProductsRouter);
app.use('/', dressRouter);
app.use('/', scrafRouter);
app.use('/', saleRouter);
app.use('/', signUpRouter);
app.use('/', signInRouter);
app.use('/', signOutRouter);
app.use('/', ordersRouter);
app.use('/', shoppingCartRouter);



/*app.use("/deleteProduct", (req, res) => {
  console.log('server deleteProduct');
},  express.static(path.join(__dirname, "material-dashboard-react", "build")));
*/
/*
app.get('/', function(req, res){
  console.log("in get func");
  res.redirect('/admin');
});
*/
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});
*/
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.countcart = err.countcart;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*app.use("/deleteProduct", (req, res) => {
  console.log('server deleteProduct');
//  res.send('Server is working. Please post at "/deleteProduct" to submit a message.');
}, ListProductsRouter);*/


/*app.get("*", (req, res) => {
  console.log('server get *');
  res.send('Server is working. Please post at "/deleteProduct" to submit a message.');
});*/
//})().catch(err => { debug(`Failure: ${err}`); process.exit(0); });



module.exports = app;
