
var express = require('express')
var router = express.Router()

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/easydog';

router.use(function (req, res,next){

 var s = { reqesterip:req.ip,
  					reqesterOriginalUrl:req.OriginalUrl,
  					time: Date.now()
  }
  console.log('ddddss')
	MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
	// Get the documents collection
  var collection = db.collection('requests');
  // Insert some documents
  
  if (req){
  
 
  console.log(s)
 collection.insert(s, function(err, result) {
   	 assert.equal(err, null);
   	 assert.equal(1, result.result.n);
   	 assert.equal(1, result.ops.length);
   	 db.close()
   	
})
}
})
next()
})
module.exports = router
