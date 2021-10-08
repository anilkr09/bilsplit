var User = require('../models/user');

var Expense = require('../models/expense');

exports.post_expense =  async function(req,res){
    var current_user_id=req.user._id;
    var req_obj=req.body;
    var user_list =req_obj.userid;
  

    var Userarr =[];
    var amountarray=[];
    var user_map=[];

    for( i =0;i<user_list.length;i++)
    {   
        var temp_obj ={};
   
        
        await User.findById(user_list[i],{email:1,name:1}, function(err,user){
        
            temp_obj.user_name = user.name;
          
        });
 

        temp_obj.user_id = (req_obj.userid[i]);
        temp_obj.shareAmount = req_obj.shareamount[i];
        temp_obj.sharePaid = req_obj.sharepaid[i];
        amountarray.push(req_obj.sharepaid[i]-req_obj.shareamount[i]);
        Userarr.push(temp_obj);
        user_map.push([temp_obj.user_name,temp_obj.sharePaid-temp_obj.shareAmount]);

    }


    // user_map.sort(function(a,b){
    //     return b[1]-a[1];
    // });
    
    expense_map={};
    var length=user_map.length;
    while(1)
    {   
        user_map.sort(function(a,b){
            return b[1]-a[1];
        })
      
        if(user_map[length-1][1]>=0)
        break;

        curr_user=user_map[length-1][0];
        if(user_map[0][1]>=Math.abs(user_map[length-1][1]))
        {
    
                var exparr=expense_map[curr_user];
                if(!exparr)
                {
                    expense_map[curr_user]=[[user_map[0][0] ,Math.abs(user_map[length-1][1])]];
                }
                else
                {
                    exparr.push([user_map[0][0] ,Math.abs(user_map[length-1][1])]);
                    expense_map[curr_user]=exparr;
                }
           
            user_map[0][1]=user_map[0][1]+user_map[length-1][1];
            user_map[length-1][1]=0;
          
        }
        else
        {  
           
                var exparr=expense_map[curr_user];
                if(!exparr)
                {
                    expense_map[curr_user]= [[user_map[0][0] ,user_map[0][1]]];

                }
                else
                {
                    exparr.push([user_map[0][0] ,user_map[0][1]]);
                    expense_map[curr_user]=exparr;
                }
                expense_map[curr_user]=[[user_map[0][0] ,user_map[0][1]]];
                exparr=expense_map[curr_user];
          
            user_map[length-1][1]=user_map[length-1][1]+user_map[0][1];
            user_map[0][1]=0;
          
        }
    }
        payments=[];
        for (var key of Object.keys(expense_map)) {
            from=key;
            expense_map[key].forEach(element => {
                payments.push({person1:from,person2:element[0],amount:element[1]});
            });
        }
        
    
   
  
    var expense1 = new Expense(
    {
        name:req_obj.name,
        amount:req_obj.expense,
        UserDetails:Userarr,
        Payments:payments
    }
    );
 
    
   expense1.save();

   for( i =0;i<user_list.length;i++)
   {
    var doc = await User.findById(user_list[i]);
    doc.expenseList.push(expense1._id);
    doc.save();
   }
    
    
    res.redirect("dashboard");
    };
    
    










    exports.get_expense = async function(req,res){





        var users;
        
           await User.findById(req.user._id, function(err,user1){
         
               users = user1.friendList;
           });
    
   
    
    data = {id:req.user._id,users:users};
    
    res.render("expense.ejs",data);
    
    };