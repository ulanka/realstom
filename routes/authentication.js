var express = require('express')
var router = express.Router()
var dbase = require('./db')
var hash = require('./pass').hash

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

/*Sign Up*/

router.get('/signup',function(req, res, next)
  { /* Loading 
  						-Sign Up- 
  											Form*/
    if (req.session.newuser===undefined){
    	//console.log('undef works')
			res.render('signup',{
				//title: 'EasyDog',
				namef: '',
  			email: '',
  			password: '',
  			confirmpassword: ''})
			next()
  	}
		else
		{
			res.render('signup', {
				//title: 'EasyDog',   	
  			namef: req.session.newuser.name,
  			email: req.session.newuser.email,
  			password: req.session.newuser.password,
  			confirmpassword: req.session.newuser.confirmpassword});
  			next()
		}
  })
  
router.get('/logout',function(req, res){
/*Log Out*/
	req.session.destroy()
	res.redirect('/')
})


router.post('/signup/', function(req, res)
{
/*Singning up and Checking Input */
	//if (req.session.name){
  console.log('post works')
  var newUser = {
		name : "",
		email: "",
		password: "",
		confirmpassword:""
		}
  	req.session.newuser = newUser
		req.session.newuser.name = req.body.name
		req.session.newuser.email = req.body.email 
		req.session.newuser.password = req.body.password 
		req.session.newuser.confirmpassword = req.body.confirmpassword 
	//}
	// Connection URL
	
  	res.render('signupconfirm', { 
  	 	name: req.session.newuser.name,
  		email:  req.session.newuser.email
   });
 
})

router.post('/confirm', function(req, res){
/*Adding new user to database and redirect to index*/
	
	var user=req.session.newuser
	
	hash(user.password, function(err, salt, hash, saveUser){
  	if (err) throw err
  	
  	user.salt = salt
  	user.hash = hash
  	user.password = ''
  	user.confirmpassword = ''
  	//console.log('hashed user')
  	//console.dir(user)
  	
  	saveUser()
		
		function saveUser(){
			dbase.signupNewUser(user, function() {
  			req.session.destroy()	
  			res.render('index', { 
  	 			message: 'Signing Up Successful'
  			})
	  	});
 		}
	})
})

router.get('/signin',function(req, res)
{
	res.render('signin',{email: '', password:''})
})

// Authenticate using our plain-object database of doom!

function authenticate(email, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', email, pass);
  dbase.checkUserExistenceAndReturnUser(email, function(user){
 		//var exuser = user
  var user = user[0]
  // query the db for the given username
  if (!user) return fn(new Error('cannot find user'));
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
 // console.dir(user[0].salt)
 // console.dir(exuser[5])
 hash(pass, user.salt, function(err, hash){
  //console.log(hash)
    if (err) return fn(err);
    if (hash == user.hash) return fn(null, user);
    fn(new Error('invalid password'));
  });
  });
}
/*
authenticate('xxx','xxx', function(err, user){
   console.dir(user)
})
/*
 dbase.checkUserExistenceAndReturnUser('xxx', function(user){
  console.dir(user)
  })*/

router.use(function(req, res, next){
  console.log('message active')
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  //res.locals.message = '';
  //if (err) res.render('signin',{message: err,email:'',password:'' })
  //if (msg) res.render('signin',{message: msg,email:'',password:'' }) 
  next();
});

console.log('authentication.js time= '+Date.now())

exports.restrict = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    //req.session.error = 'Access denied!';
    res.render('signin',{message: 'Access denied!',email:'',password:'' }) 
  }
}

router.get('/restricted', function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});


router.post('/signin/', function(req, res){
  authenticate(req.body.email, req.body.password, function(err, user){
  console.dir(user)
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.message = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        //res.redirect('index');
        res.render('index', {message:'signin successful'})
      });
    } else {
      req.session.message = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
     // res.redirect('/signin');
     res.render('index', {message:'signing in fail'})
    }
  });
});


module.exports.router = router
