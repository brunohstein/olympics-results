var express = require('express');
var router = express.Router();
var database = require('../database.json');

database.countries = database.countries.map(function(country) {
  country.medals.total = country.medals.gold + country.medals.silver + country.medals.bronze;
  return country;
});

router.get('/', function(req, res, next) {
  res.render('index', {
    countries: database.countries
  });
});

module.exports = router;
