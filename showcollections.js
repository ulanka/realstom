var MongoClient = require('mongodb').MongoClient
  , format = require('util').format,
  assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/easydog'

function collectionsofED(callback)
{
	MongoClient.connect(url, function(err, db) 
	{
  	if(err) throw err;
 		/* 
 			db.collectionNames(function(err, collections){
     		console.log(collections);
  		});
  	*/
 
   	db.collections(function(err, collections){
   		//console.log(collections.length)
   		var result = new Array
   		
   		for (i=0;i<collections.length;i++)
      {
      	result[i]= collections[i].s.name
      }
      
      callback(result)
  	})
	});
}

/*check collectionsofED*/
//collectionsofED(print)
/*
function print(result){
	console.log(result)
}
*/
/*check collectionsofED*/


function showDocuments(collection, callback)
{
	MongoClient.connect(url, function(err, db) 
	{
  	if(err) throw err;
   	 db.collection(collection).find({}).toArray(function(err, result)	
   		{
   	 		callback(result)
			})
  })
}

/*Add a document by given collecction and document*/
function addDocument(collection, document, callback){
	MongoClient.connect(url, function(err, db){
		if (err) throw err
		
		db.collection(collection).insert(document, function(err, result) 				{
 			console.log(result)
   	 	assert.equal(err, null);
   	 	assert.equal(1, result.result.n);
   	 	assert.equal(1, result.ops.length);
   	 	db.close()
   	 	callback(result);
  		})
	})
}

/*create template document by given template name and array of fields required to be added*/
function createTemplate(templateName, fieldsArray, callback){
	
	var readyTemplate = { 
		template: templateName, 
		fields:fieldsArray
	}
	callback(readyTemplate)	
}

/*1. creates template
	2. adds it to 'templates' collection as any other document, 
		using addDocument function*/
function addTemplate(templateName, fieldsArray,callback){
	createTemplate(templateName,fieldsArray, function(readyTemplate){
	addDocument('templates',readyTemplate,function(result){
	callback(result)})})
}

function returnArrayofFields(document, callback){
	
}

/*1check adding of a template*/
/*
s= [{field:'User Name'},{field:'address'}]

addTemplate('temp2',s,function(result){
	console.log('result = '+result)
})
*/
/*1check adding of a template*/


/*2check showDocuments*/
/*
showDocuments('users', function(result){
	console.log(result)
})
*/
/*2check showDocuments*/


exports.collectionsofED = collectionsofED
exports.showDocuments = showDocuments
