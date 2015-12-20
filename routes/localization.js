var express = require('express')
var router = express.Router()
/*Localization via query. does not work yet
router.get('/', function(req, res, next){
	if (req.query.lang=='ru')
		req.session.lang='ru'
	if (req.query.lang=='kz')
		req.session.lang='kz'
	if (req.query.q=='en')
		req.session.lang='en'
		//console.log('yess')
		res.redirect('back')
	next()
})
*/
module.exports.router = router
