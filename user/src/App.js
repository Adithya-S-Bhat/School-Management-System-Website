import Layout from './layout/layout'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/*import express from 'express'
var app=express()
var url=require("url")
app.get("/",(req,res)=>{
  var q=url.parse(req.url,true).query
})*/
//import mongoose from 'mongoose'
/*// Load User model
import User from './models/User';
//const mongoose=require('mongoose')
const db='mongodb+srv://adithya:adi@cluster0.jef7y.mongodb.net/login?retryWrites=true&w=majority';
//Connect to mongo
mongoose.connect(db,{useUnifiedTopology:true})//returns a promise
.then(()=>console.log("MongoDB connected.."))
.catch(err =>console.log(err))
/*var mailid=url.parse(req.url,true).pathname
User.findOne({email:mailid}).then(user=>{}
res.redirect("/")*/


function App() {
  return (
    <div className="App">
      {/*<Router>
        <Route exact path="/:qs" component={Layout} />
      </Router>*/}
      <Router>
        <Switch>
          <Route exact path="/:qs" component={Layout}/>
          {/*<Route path="/" component={Layout}/>*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
