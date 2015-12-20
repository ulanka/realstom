var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('prices', {title: 'Stomatis',lang:req.session.lang,leftmenu:req.session.leftmenus})
})

module.exports.router = router;
