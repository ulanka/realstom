var express = require('express')
var router = express.Router()


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/easydog';


exports.leftmenu = leftmenu


 function leftmenu (callback){
 MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
  	
		// Get the documents collection
  	var collection = db.collection('leftmenu');
  	collection.find({}).sort({'priority':1}).toArray(function(err,items){
			assert.equal(err,null)
			db.close()
			console.log(items)
			callback(items)
		})
  
})
}

function companyinfoarticle (articlenamef, callback){
 MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
  	
		// Get the documents collection
  	var collection = db.collection('companyinfo');
  	collection.find({articlename:articlenamef}).toArray(function(err,items){
			assert.equal(err,null)
			db.close()
			callback(items)
		})
  
})
}





/*router.use(function(req, res,next){
	if (req.query.q=='en')
		console.log('yess')
	next()
})
*/

/*
router.get('/kz', function(req, res){
	req.session.lang='kz'
	leftmenu(function(items){
	
		res.render('index', { title: 'Stomatis', leftmenu:items, lang:req.session.lang });
		console.log(items)
	}) 
	
})

router.get('/en', function(req, res){
	req.session.lang='en'
	leftmenu(function(items){
	
		res.render('index', { title: 'Stomatis', leftmenu:items, lang:req.session.lang });
		console.log(items)
	}) 
	
})
*/
router.get('/:name', function(req, res){
	//req.session.lang=''
	//if (req.param('name')=='workinghours')
	var articlename=req.param('name')
	//if (req.param('name')=='phone')
	//var articlename='phone'
	companyinfoarticle(articlename,function(items){
	leftmenu(function(items2){
	
		res.render('workinghours', { title: 'Stomatis', article:items[0], lang:req.session.lang, leftmenu:items2 });
		console.log(items)
		})
	}) 
	
})




module.exports.router = router
