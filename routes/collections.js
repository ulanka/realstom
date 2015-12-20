var express = require('express')
var router = express.Router()
var showcollections = require('../showcollections')
var auth = require('./authentication').restrict

router.get('/',/* auth,*/ function(req, res){
	showcollections.collectionsofED(function(result){
		var r = {collections: result}
		console.log(r)
		res.render('collections', r)
		
	})
})
//http://mongodb.github.io/node-mongodb-native/markdown-docs/collections.html
//http://naltatis.github.io/jade-syntax-docs/#for

//https://www.npmjs.com/search?q=content+manager
//http://www.w3schools.com/tags/tag_iframe.asp
//http://htmleditor.in/fulleditor.htm
//http://www.kevinroth.com/rte/demo.htm
//http://www.richarea.com/installation
//http://www.space.kz/service/hosting/virtual/
//http://nic.kz/srs/registrars.jsp
//http://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe
//http://docs.mongodb.org/manual/tutorial/query-documents/#read-operations-arrays
router.get('/:name', function(req, res){
	if (req.param('name')=='users'){
	showcollections.showDocuments('users',function(result){
	/**/
		var s =result[0].name+result[0].email
		res.render('document', {document:s})
	})
	}
//	res.send('users pressed')
})

module.exports = router
