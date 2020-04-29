import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Search from "./routes/Search";
import Callback from "./routes/Callback";
import Logout from "./routes/Logout"
import AddBot from "./routes/AddBot"

import NotFound from "./components/404"
import Menu from "./components/Menu"
import Redirect from "./components/Redirect"

import "./App.css";

function App() {
  console.log(localStorage.getItem('token'))
  return (
    
    <Router>
      
      <Menu token={localStorage.getItem('token')} id={localStorage.getItem('id')} date={localStorage.getItem('date')}/>
      <Switch>
      
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/search" component={Search} />
      <Route path="/addbot" component={AddBot} />
      <Route path="/callback" component={Callback} />
      <Route path="/logout" component={Logout} />
      <Route path="/bots/:id" component={Detail} />
      <Route path="/discord">
        <Redirect to="https://discord.gg/JEh53MQ"/>
      </Route>
      <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
