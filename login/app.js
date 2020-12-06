const express=require("express");
const expressLayouts=require("express-ejs-layouts")
const mongoose=require('mongoose')
const flash=require('connect-flash')
const session=require('express-session');
const passport = require("passport");
const app=express();

app.set('trust proxy',1)

//passport config
require('./config/passport')(passport)

//DB config
const db=require('./config/keys').MongoURI

//Connect to mongo
mongoose.connect(db,{
  useUnifiedTopology:true,
  useNewUrlParser: true,})//returns a promise
.then(()=>console.log("MongoDB connected.."))
.catch(err =>console.log(err))

//Middleware-EJS
app.use(expressLayouts)
app.set('view engine','ejs')

//bodyparser middleware
app.use(express.urlencoded({extended: true}))

//Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Connect flash
app.use(flash());

//MW to use static files
app.use('/static',express.static("public"))

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//Routes
app.use('/',require('./routes/index.js'))
app.use('/users',require('./routes/users.js'))

const PORT=process.env.PORT||5000;

app.listen(PORT,console.log('Server started on port '+PORT));
