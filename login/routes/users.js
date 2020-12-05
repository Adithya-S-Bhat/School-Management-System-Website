const express = require('express');
const app=express()
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fs=require("fs")
const fileUpload=require("express-fileupload")

//MW for File upload
app.use(fileUpload())

// Load User model
const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

//Users Page
var user;
router.get('/',ensureAuthenticated,(req,res)=>{
  user=req.user
  res.redirect("//"+req.hostname+':3000/{"user":"'+user.name+'","email":"'+user.email+'","institution":"'+user.institution+'","studentorteacher":"'+user.studentorteacher+'"}')
})

//Delete
router.get('/delete/:uemail',ensureAuthenticated,(req,res)=>{
  User.deleteOne({ email: req.params.uemail }).then(() => {
    //success
    res.redirect("/users/logout")
  })
  .catch((err)=>{
    req.status(500).send("Email doesn't exist")
  })
})

//Upload
router.post('/upload/:roomId',ensureAuthenticated,(req,res)=>{
  if(!req.files||req.files.length==0)
    res.status(400).send("No files uploaded")
  else{
    var ipfile=req.files.ipfile;
    ipfile.mv("../public/"+roomId+ipfile.name,(err)=>{
      if(err)
        return res.status(500).send("Could not save the file")
      //successful
      res.redirect('//'+window.location.hostname+":3000/chat/"+roomId)
    })
  }
})

// handle Register
router.post('/register', (req, res) => {
  const { name, email, institution, password, password2, studentorteacher } = req.body;
  let errors = [];
  //Validation
  //1.check required fields
  if (!name || !email || !institution ||!password || !password2 || !studentorteacher) {
    errors.push({ msg: 'Please enter all fields' });
  }
  //2.check password match
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  //3.check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      institution,
      password,
      password2,
      studentorteacher
    });
  } 
  else {
    //Validation passed
    User.findOne({ email: email }).then(user => {
    //user already exists
      if (user) {
        errors.push({ msg: 'Email is already registered' });
        res.render('register', {
          errors,
          name,
          email,
          institution,
          password,
          password2,
          studentorteacher
        });
      } else {
        const newUser = new User({
          name,
          email,
          institution,
          password,
          studentorteacher
        });
        //hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/',///dashboard
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

/*//Work Arounds
router.get("//localhost:5000/users/logout",(req,res)=>{
  res.redirect("//"+user.hostname+":5000/users/logout")
})*/

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;