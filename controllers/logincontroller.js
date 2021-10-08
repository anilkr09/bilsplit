const passport =  require('passport');

exports.login_get = function(req,res)
{
	var errormsg=req.flash('error')[0];
res.render('login',{error:errormsg});
};


var a =passport.authenticate('local',{
	successRedirect:'/',
	failureRedirect:'/login',
	failureFlash:true
})



exports.login_post = a;




