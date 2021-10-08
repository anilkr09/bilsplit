var passport = require('passport')

   const bcrypt = require('bcrypt')

  var User = require('./models/user');

  const LocalStrategy = require('passport-local').Strategy
  // const mongoose = require('mongoose')
  // mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
  
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
GOOGLE_CLIENT_ID='620206540298-qpplq67a1gcqlkaqvqviggfe12ftbe07.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET='bvZzEbmYOqkukIsMVxidq8Ia'





passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "splitx.herokuapp.com/auth/google/callback"
    
  },
  function(accessToken,email, refreshToken, profile, done) {
    console.log(profile.id);
       User.findOrCreate( { id: profile.id ,name:profile.name.givenName }, function (err, user) {
        // console.log(profile.birthday);
        console.log(profile.name.givenName);
          
         return done(err, user);
       });
    //  console.log(accessToken,refreshToken,profile);
  }
));



 function  initialize()
{
    const authenticateUser = (email, password, done) => {
        User.findOne({ email: email }, async function (err, user) {
          if (err) { return done(err); }
          if (!user) {
          

            return done(null, false, { message: 'Incorrect username.' });
          }
  
         
            try{
                
                if(await bcrypt.compare(password,user.password)){
                    return done(null,user)
                }
                else{
              
                    return done(null,false,{message:'Password incorrect'})
                }
                
                }catch(e){
                return done(e)
                }
            // return done(null, user);
        });
      }
      
passport.use( new LocalStrategy({usernameField:'email'} ,authenticateUser
  
  ));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
   
      User.findOne({id:id}, function(err, user) {
      done(err, user);
    });
  });
}

module.exports = initialize



