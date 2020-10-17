import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./routes/Home";
import About from "./routes/About";
import Bots from "./routes/Bots";
import Search from "./routes/Search";
import Callback from "./routes/Callback";
import AddBot from "./routes/AddBot";
import ManageBot from "./routes/ManageBot"
import Profile from "./routes/Profile";
import Pending from "./routes/Pending";
import GuideLines from "./routes/GuideLines";

import Version from "./routes/Version";
import Category from "./routes/Category";
import Boost from "./routes/Boost";
import User from "./routes/Users";

import NotFound from "./components/404";
import Menu from "./components/Menu";
import Redirect from "./components/Redirect";
import Footer from "./components/Footer";

import "./App.css";
import Privacy from "./routes/Privacy";
import Ad from "./routes/Ad";
import Partners from "./routes/Partners";
import Trusted from "./routes/Trusted";
import ScrollTop from "./components/ScrollTop";
import GithubCallback from "./routes/Github";
import Report from "./routes/Report";
import ServiceNotAvailable from "./routes/ServiceNotAvailable";



function App(props) {
  const [ Dark, setDark ] = useState(localStorage.dark === undefined || JSON.parse(localStorage.dark) ? true : false)
  try {
    const systemColor = window.matchMedia('(prefers-color-scheme: dark)')
    if(localStorage.dark === undefined) localStorage.dark = systemColor.matches
    systemColor.addEventListener('change', () => { setDark(systemColor.matches) })
  } catch(e) {}

  return (

    <Router>
      <div className={Dark ? 'darkmode' : 'whitemode'}>
      <Menu
        Darkmode={Dark}
        token={localStorage.getItem("token")}
        setDark={setDark}
      />
      <ScrollTop>
      <div style={{ position: 'relative', minHeight: '100vh' }} >
    
      <Switch>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/search" component={Search} />
        <Route path="/categories/:category" component={Category} />
        <Route path="/profile">
          <Redirect to="/panel"/>
        </Route>
        <Route path="/panel" component={Profile} />
        <Route path="/addbot" component={AddBot} />
        <Route path="/callback/discord" component={Callback} />
        <Route path="/callback/github" component={GithubCallback} />
        <Route path="/pendingBots/:id/:date" component={Pending} />
        <Route exact path="/bots/:id" component={Bots} />
        <Route exact path="/users/:id" component={User} />
        <Route path="/discord">
          <Redirect to="https://discord.gg/JEh53MQ" />
        </Route>
        <Route path="/manage/:id" component={ManageBot}/>
        <Route path="/report/:id" component={Report} />
        <Route path="/clientinfo" component={Version}/>
        <Route path="/guidelines" component={GuideLines} />
        <Route path="/privacy" component={Privacy}/>
        <Route path="/boost" component={Boost} />
        <Route path="/partners" component={Partners} />
        <Route path="/verification" component={Trusted} />
        <Route path="/ad" component={Ad} />
        <Route path="/service-not-available" component={ServiceNotAvailable} />
        <Route component={NotFound}></Route>
      </Switch>
        </div>
        <Footer Dark={Dark} setDark={setDark}/>
        </ScrollTop>
        </div>
        
    </Router>
  );
}

export default App;
