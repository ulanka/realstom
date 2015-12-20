var express = require('express')
var router = express.Router()

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');


var i = 0
var strst = ''
exports.conCheck = function(req, res)
{
  //console.log('db module connected')
  //res.end()
  res.render('index', { title: 'Express', database: 'is connected' });
}

router.get('/',function(req, res)
  { 
    i++
    console.log('i = '+i)
 /*
    var db = require('mongoskin').db('mongodb://localhost:27017/mydb');

    db
    .collection('testData')
    .find({name:'mongo'})
    .toArray(function(err,   result) 
    {
      if (err) throw err;
      
      console.log(result);
  
      
    });
  */
  res.render('signup', { 
  	db: '', 
  	title: 'Express', 
  	database: 'is connected', 
  	numberCall: i, 
  	strs: 'strs', 
  	namef: req.session.name,
  	email: req.session.email,
  	password: req.session.password,
  	confirmpassword: req.session.confirmpassword});

  })



var signupNewUser = function(db, req, callback){
	// Get the documents collection
  var collection = db.collection('testData');
  // Insert some documents
  collection.insert([
    {name : req.session.name,
     email: req.session.email,
     password: req.session.password}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 document into the document collection");
    callback(result);
  });
}

router.get('/insert2', function(req, res)
  {
    //res.send('hello this is GET response')
    var db = require('mongoskin').db('mongodb://localhost:27017/mydb');
    
    var s = {
	      name: "Avril2",
	      song: "Complicated2"		
            }

    db.collection('testData').insert
      (s, function(err, result) 
      			{
        			console.log(result);
        			db.collection('testData').drop();
        			db.close();
      			});
    //res.render('add data', { db: result[0].name, title: 'Express', database: 'is connected', numberCall: i, strs: 'strs' });
  })


router.get('/insert3',function(req, res){
  
// Connection URL
var url = 'mongodb://localhost:27017/mydb';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  
  console.log("Connected correctly to server");
  insertDocuments(db, function() {
    db.close();
  });
  
});
})

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insert([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 document into the document collection");
    callback(result);
  });
}
module.exports = router
