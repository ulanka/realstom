var express = require('express')
var router = express.Router()
var hash = require('./pass').hash;

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/easydog';
console.log('db.js time= '+Date.now())

/*Insert new user data to users collection*/
exports.signupNewUser = function(user, callback){

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
	// Get the documents collection
  var collection = db.collection('users');
  // Insert some documents
  if (user){

  
 collection.insert(user, function(err, result) {
 			console.log(result)
   	 assert.equal(err, null);
   	 assert.equal(1, result.result.n);
   	 assert.equal(1, result.ops.length);
   	 db.close()
   	 callback(result);
  })
  
  
  
  }
})
}

userExist = function (namef, fn)
//exports.userExist = function (namef, fn)

{
	MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  	user = db.collection('users').find({name:namef})
  	if (err) return(err)
  	if (user) return fn(null, user)
	})	
}


exports.checkUserExistenceAndReturnUser = function (emailToSearch, callbac){
  MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
  	//user = db.collection('users').find({name:'Ulan'})
  	console.log('Connected corr')
  	findUserDocument(db, emailToSearch, function(docs){
  	//console.dir(docs)
  		db.close()
  	//if (err) return(err)
  	//if (docs) return(docs)
  	callbac(docs)
  	})
  	
  	
  })
  console.log('///')
}

var findUserDocument = function (db, emailToSearch, callback){
	
	var collection = db.collection('users')
	
	collection.find({email: emailToSearch}).toArray(function(err,docs){
	assert.equal(err,null)
//	assert.equal(2, docs.length)
//	console.log('FOund the followiong records')
	//console.dir(docs)
	callback(docs)
	})
}

/*checkUserExistenceAndReturnUser('xxx', function(user){
	console.dir(user)
})*/

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

/*
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
*/
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
//module.exports = router
//module.exports = {}
