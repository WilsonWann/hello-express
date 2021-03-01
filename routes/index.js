var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/sayHi', function (req, res, next) {
  res.send('hi');
});

router.post('/api/echo', function (req, res, next) {
  const { body } = req;
  res.json(body);
})

module.exports = router;
