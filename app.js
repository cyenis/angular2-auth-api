var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var task = require('./routes/task');
var response = require('./helpers/response');

var app = express();

mongoose.connect('mongodb://localhost/app-todo-db');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/task', task);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  response.notFound(res);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  if (!res.headersSent){

    response.unexpectedError(req, res, err);
  }
});

module.exports = app;
