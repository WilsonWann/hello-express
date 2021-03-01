const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();

const MongoClient = require('mongodb').MongoClient;

// mongodb 位置
const url = 'mongodb://localhost:27017';

// 資料庫名
const dbName = 'myproject';

// 建立一個 MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

const EchoDao = require('./daos/EchoDao');

const echoDao = new EchoDao({ mongoClient: client });

const MongoService = require('./services/MongoService');

const mongoService = new MongoService({ mongoClient: client, echoDao });
const { createRouter: createRootRouter } = require('./routes/index');
const indexRouter = createRootRouter({ mongoService, express });
const usersRouter = require('./routes/users');

// client 開始連線
client.connect()
  .then((connectedClient) => {
    console.log('mongodb is connected');
  })
  .catch(error => {
    console.error(error);
  });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
