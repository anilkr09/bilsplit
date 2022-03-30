

var User = require('../models/user');

const bcrypt = require('bcrypt');

exports.register_post  =  async function (req,res) {


{
try{
	
const hashedPassword  = await bcrypt.hash(req.body.password,10)


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


