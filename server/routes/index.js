var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/post-test', (req, res) => {
  console.log('Got body:', req.body);
  res.sendStatus(200);
});

module.exports = router;
