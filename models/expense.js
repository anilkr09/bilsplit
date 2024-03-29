const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/test',{
	useNewUrlParser:true,
	useUnifiedTopology:true
});
const expenseSchema = new mongoose.Schema({
        name:String,
        amount:Number,
        UserDetails:[{
            user_id:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
            user_name:String,
            shareAmount:String,
            sharePaid:String
    }],
    Payments:[{person1:String,person2:String,amount:Number}]
});


module.exports = mongoose.model('Expense',expenseSchema);
