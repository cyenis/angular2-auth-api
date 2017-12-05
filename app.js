const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const response = require('./helpers/response');
const configurePassport = require('./helpers/passport');
const auth = require('./routes/auth');
const task = require('./routes/task');

const app = express();

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/app-todo', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// -- setup the app

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'todo-app',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const passport = configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// -- routes

app.use('/auth', auth);
app.use('/task', task);

// -- 404 and error handler

app.use(function (req, res, next) {
  response.notFound(req, res);
});

// NOTE: requires a views/error.ejs template
app.use(function (err, req, res, next) {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only send if the error ocurred before sending the response
  if (!res.headersSent) {
    response.unexpectedError(req, res, err);
  }
});

module.exports = app;
