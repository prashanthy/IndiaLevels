var express = require('express');
var router = express.Router();
var fs = require('fs');
var cities = require('../fullCities.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/post-test', (req, res) => {
  console.log('Got body:', req.body);
  res.json({ username: 'Prashanth123' });
  res.sendStatus(200);
});

router.get('/cities', function(req, res, next){
  console.log(cities);
  res.json(cities);
});


module.exports = router;