var User = require('../models/user');



exports.friendpost = async function(req,res){

    console.log(req.user.name);
  
    var req_obj=req.body;
  
    
    
    
    const userid = req.user._id;
   
    const current_user_doc = await User.findById(userid);


 
    
    var newfriends =req_obj.userid;
    
    
    if(newfriends.length==24)
    {    
       
        
        var newfriendlist=[];
        newfriendlist.push(newfriends);
       

    }
    else
    var newfriendlist=newfriends;
    
    
    for( i =0;i<newfriendlist.length;i++)
    {



   //here add logic for user exists already as firend
    

       var  friendList = current_user_doc.friendList;
        var flag=0;
        if(friendList)
        for(var j=0;j<friendList.length;j++)
        {
        if(friendList[j].user_id==newfriendlist[i])
        { flag=1;break;}
        }
        if(flag==1)
        { console.log("friend already exists");
        }
       else
        {
        
        var temp_obj ={};
        
        await User.findById(newfriendlist[i],{email:1,name:1}, function(err,user){
            
            temp_obj.name = user.name;
            temp_obj.email=user.email;
         
            

        });
 
        
        

        temp_obj.user_id = (newfriendlist[i]);
       
        
        current_user_doc.friendList.push(temp_obj);
        }

    }
    
    await current_user_doc.save();
   
   
    
    res.redirect('/dashboard');

}

exports.friendget = async function(req,res){

    var allusers;
    
       await User.find({},{email:1,name:1}, function(err,users){
       
           allusers = users;
       });


       


data = {users:allusers};

res.render("addfriend.ejs",data);

};  