
var express = require('express');
//var app = express()
var myrouter = express.Router()

//console.log(myrouter)

myrouter.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

myrouter.get('/bla', function (req, res){
  res.send('users')

});

myrouter.get('/user', function (req, res){
  res.send(req.body.name+'user')
});


module.exports = myrouter;
