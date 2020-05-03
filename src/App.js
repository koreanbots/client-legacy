import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./routes/Home";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Search from "./routes/Search";
import Callback from "./routes/Callback";
import Logout from "./routes/Logout";
import AddBot from "./routes/AddBot";
import ManageBot from "./routes/ManageBot"
import Profile from "./routes/Profile";
import Pending from "./routes/Pending";
import GuideLines from "./routes/GuideLines";
import Login from "./routes/Login";
import Version from "./routes/Version";

import NotFound from "./components/404";
import Menu from "./components/Menu";
import Redirect from "./components/Redirect";
import Footer from "./components/Footer";

import "./App.css";


function App() {
  const [ setDimm, Dimmed ] = useState(false)

  return (
    <Router>
      <Menu
        Dimm={Dimmed}
        setDimm={setDimm}
        token={localStorage.getItem("token")}
        id={localStorage.getItem("id")}
        date={localStorage.getItem("date")}
      />
      <div style={{ position: 'relative', minHeight: '95vh' }}>
            <div style={{ paddingBottom: '10rem' }}>
      <Switch>
       
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/search" component={Search} />
        <Route path="/profile" component={Profile} />
        <Route path="/addbot" component={AddBot} />
        <Route path="/callback" component={Callback} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/pendingBots/:id/:date" component={Pending} />
        <Route exact path="/bots/:id" component={Detail} />
        <Route path="/discord">
          <Redirect to="https://discord.gg/JEh53MQ" />
        </Route>
        <Route path="/manage/:id" component={ManageBot}/>
        <Route path="/clientinfo" component={Version}/>
        <Route path="/guidelines" component={GuideLines} />
        <Route component={NotFound}></Route>
       
      </Switch>
      </div>
      <Footer/>

        </div>
    </Router>
  );
}

export default App;
