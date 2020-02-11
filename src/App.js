import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Search from "./routes/Search";
import Callback from "./routes/Callback";
import "./App.css";
import NotFound from "./components/404"
import Menu from "./components/Menu"

function App() {
  console.log(localStorage.getItem('token'))
  return (
    
    <Router>
      
      <Menu token={localStorage.getItem('token')}/>
      <Switch>
      
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/search" component={Search} />
      <Route path="/callback" component={Callback} />
      <Route path="/bots/:id" component={Detail} />
      <Route path="/discord">
        <Redirect to="https://discord.gg"/>
      </Route>
      <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
