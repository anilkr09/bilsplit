if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}
const express = require('express');
const app = express();
// const bcrypt = require('bcrypt');
const passport =  require('passport')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const methodOverride = require('method-override')
const flash = require('express-flash')
app.use(flash());
const session =  require('express-session')
//passport-config use np
var initialize = require('./passport-config');
initialize();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))


app.use(session({
secret : process.env.SESSION_SECRET,
resave :false,
saveUninitialized:false
}	
))


app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

var catalogRouter = require('./routes/catalog');

app.use('/', catalogRouter);
const port = process.env.PORT ||5000
app.listen(port);
app.set('view engine','ejs');


// app.get('/login',(req,res)=>{res.render('login');})

module.exports =  app;