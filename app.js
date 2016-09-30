var express = require('express');
var compression = require('compression');
var minify = require('express-minify');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var postcssMiddleware = require('postcss-middleware');
var autoprefixer = require('autoprefixer')({ browsers: ['> 1%', 'IE 7'], cascade: false });
var sassMiddleware = require('node-sass-middleware');

var routes = require('./routes/index');

var app = express();

app.use(compression());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  outputStyle: 'compressed'
}));

app.use('/stylesheets', postcssMiddleware({
  src: function(req) {
    return path.join('public', 'stylesheets', req.path);
  },
  plugins: [autoprefixer]
}));

if (app.get('env') !== 'development') {
  app.use(minify());
}

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function(request, response, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

if (app.get('env') === 'development') {
  app.use(function(error, request, response, next) {
    response.status(error.status || 500);
    response.render('error', {
      message: error.message,
      error: error
    });
  });
}

app.use(function(error, request, response, next) {
  response.status(error.status || 500);
  response.render('error', {
    message: error.message,
    error: {}
  });
});

module.exports = app;
