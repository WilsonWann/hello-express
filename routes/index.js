/**
 * 
 * @param {MongoClient} client 
 */
function createRouter(dependencies) {
  // Get dependencies
  const { mongoService, express } = dependencies;
  if (!mongoService) throw new Error('mongoService is empty');
  if (!express) throw new Error('express is empty');

  // var express = require('express');
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

    mongoService.insertEcho(body)
      .then(() => {
        res.json(body)
      })
      .catch(next);
  })

  router.get('/api/mongo', function (req, res, next) {
    mongoService.isConnected()
      .then(isConnected => {
        res.json({ isConnected });
      })
      .catch(next);
  });

  return router;
}

module.exports = {
  createRouter
};