var express = require('express');
var router = express.Router();

router.get('/:lang', function(req, res){
	if (req.param('lang')=='ru')
	req.session.lang='ru'
	if (req.param('lang')=='kz')
	req.session.lang='kz'
	if (req.param('lang')=='en')
	req.session.lang='en'
	
		res.redirect('back')
	
	/*leftmenu(function(items){
	
	
		res.render('index', { title: 'Stomatis', leftmenu:items, lang:req.session.lang });
		console.log(items)
	}) 
	*/
})

module.exports.router = router
