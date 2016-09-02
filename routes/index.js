var express = require('express');
var router = express.Router();
var database = require('../database.json');

router.get('/', function(req, res, next) {
  res.render('index', {
    countries: database.countries
  });
});

module.exports = router;
