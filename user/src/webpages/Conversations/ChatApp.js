import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";

export default function App(props) {
  const userinfo=props.userinfo
  return (
    <div>
    <Router>
      <Switch>
        <Route exact path="/chat/:roomId" render={(props)=> (<ChatRoom {...props} userinfo={userinfo}/>) }/>
        {/*<Route exact path="/chat/:name" component={ChatRoom}/>*/}
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
    </div>
  );
}
