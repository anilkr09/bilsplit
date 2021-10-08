var express = require('express');
var router = express.Router();
const passport =  require('passport');
var expensecontroller = require('../controllers/expensecontroller');
var registercontroller = require('../controllers/registercontroller');
var friendctl = require('../controllers/friendctl');
var dashboardctl = require('../controllers/dashboardctl');


var login_controller = require('../controllers/logincontroller');



router.get('/login',login_controller.login_get);
router.post('/login',login_controller.login_post);


router.get('/',checkAuthenticated,(req,res)=>{
	res.render('index.ejs',{name : req.user.name})
})


router.get('/register',registercontroller.register_get);

router.post('/register',registercontroller.register_post);



function checkAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/login')
}

function checkNotAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return res.redirect('/')
	}
	next()
}



router.delete('/logout',(req,res)=>{
	req.logOut()
	res.redirect('/login')
})


router.get('/expense',checkAuthenticated, expensecontroller.get_expense);
router.post('/expense',expensecontroller.post_expense);
router.get('/addfriend',checkAuthenticated, friendctl.friendget);
router.post('/addfriend',friendctl.friendpost);



    
router.get('/dashboard',checkAuthenticated,dashboardctl.post_dashboard);


// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]}));



// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',successRedirect:'/' }),
  function(req, res) {
	res.redirect('/dashboard');
  });




module.exports = router;