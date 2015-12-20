var express = require('express');
var router = express.Router();
//var initvars = require('./index')

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/easydog';


router.get('/', function(req, res){
 
 MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
  	
		// Get the documents collection
  	var collection = db.collection('doctors');
  	collection.find({}).toArray(function(err,items){
			assert.equal(err,null)
			db.close()
			//initvars.initvars(function(){
				res.render('doctors', {title: 'Stomatis', doctors:items,lang:req.session.lang,leftmenu:req.session.leftmenus})
			//})
		})
  
})
})

module.exports.router = router;
