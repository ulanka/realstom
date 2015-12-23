var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
  //res.render('index', { title: 'Express' });
});



module.exports.router = router;
