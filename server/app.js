require('dotenv').config();
require('./db');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/api', apiRouter);
app.use('/', indexRouter);

module.exports = app;
