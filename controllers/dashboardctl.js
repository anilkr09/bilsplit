 var User = require('../models/user.js');
 var Expense = require('../models/expense')
 
 var a =async (req,res)=>{
	


       
	var user = await User.findById(req.user._id);
	var expense_list =user.expenseList;
	expense_data =[];

   for(var i=0;i<expense_list.length;i++)
    {
	
	var expense =  await Expense.findById(expense_list[i]);
	expense_data.push(expense);

 	};
	
	
	res.render("dashboard",{data :expense_data});


}

exports.post_dashboard = a;