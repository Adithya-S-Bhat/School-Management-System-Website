import Layout from './layout/layout'
import Uploadsuccess from './webpages/Conversations/ChatRoom/Uploadsuccess'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/:qs" component={Layout}/>
          <Route exact path="/chat/uploadsuccess" component={Uploadsuccess}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
