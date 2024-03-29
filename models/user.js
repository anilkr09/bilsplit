const mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/test',{
	useNewUrlParser:true,
	useUnifiedTopology:true
});

const userSchema = new mongoose.Schema({
	id:Number,
	name:String,
	friendList:[{user_id:String,name:String,email:String}],
	expenseList:[{expense_id:String}],
	email:String,
	password:String

});
userSchema.plugin(findOrCreate);


module.exports = mongoose.model('User',userSchema)



