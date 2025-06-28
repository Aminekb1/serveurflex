var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http =require("http")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
//var ressourceRoute = require('./routes/ressourceRoute');
const ressourceRoute = require('./routes/ressourceRoute');
var osRouter = require("./routes/osRouter");
var commandeRouter = require('./routes/commandeRouter');
var factureRoute = require('./routes/factureRouter');
//var panierRoute = require('./routes/panierRoute');
//var catalogueRoute = require('./routes/catalogueRoute');
var notificationRoute = require('./routes/notificationRoute');
var statsRoute = require('./routes/statsRoute');
/*const cors = require("cors");
const session = require("express-session"); //session */

const { connectToMongoDB } = require("./db/db");
require("dotenv").config(); // configuration .env
var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/os", osRouter);
app.use('/ressource', ressourceRoute);
app.use('/commandes', commandeRouter);
app.use('/factures', factureRoute);
app.use('/stats', statsRoute);
//app.use('/paniers', panierRoute);
//app.use('/catalogues', catalogueRoute);

app.use('/notifications', notificationRoute);

//const osController = require(" .. /Controllers/osController")
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

const server = http.createServer(app);
server.listen(process.env.Port, () => {
  connectToMongoDB(),
  console.log("app is running on port 5000");
});

