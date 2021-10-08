

var User = require('../models/user');

const bcrypt = require('bcrypt');

exports.register_post  =  async function (req,res) {


	
var flag=0;
await User.findOne({email:req.body.email},function(err,user) {
	if(user)
	{	
		flag=1;
		
	}
});

if(flag==1)
{console.log("user exists");res.render('register',{flag:1});}

else
{
try{
	
const hashedPassword  = await bcrypt.hash(req.body.password,10)

//insert user inside database



var newuser = new User(
{	
	id:Date.now().toString(),
	name : req.body.name,
	friendList:[],
	email:req.body.email,
	password:hashedPassword
}
);

newuser.save();

res.redirect('login');

}



catch{
	console.log("failure redirect");
	res.redirect('/register')
}
}
};

exports.register_get = function(req,res){
	res.render('register.ejs',{flag:0})
};


