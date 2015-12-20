
var express = require('express')
var router = express.Router()

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/easydog';

exports.regReq = function (req, res){
console.log('mmm')
	MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
	// Get the documents collection
  var collection = db.collection('requests');
  // Insert some documents
  console.log('mmm')
  if (req){
  var s = {reqip:req.ip}
  console.log(s)
 collection.insert(s, function(err, result) {
   	 assert.equal(err, null);
   	 assert.equal(1, result.result.n);
   	 assert.equal(1, result.ops.length);
   	 db.close()
   	
})
}
})

}

