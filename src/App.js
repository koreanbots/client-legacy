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
import API from "./routes/API";
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
import { Advertisement, Container } from "semantic-ui-react";
import GitInfo from "react-git-info/macro";



function App() {
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
            <div style={{ paddingBottom: '34rem' }} className="wrap">
      <Switch>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/search" component={Search} />
        <Route path="/categories/:category" component={Category} />
        <Route path="/profile" component={Profile} />
        <Route path="/addbot" component={AddBot} />
        <Route path="/callback/discord" component={Callback} />
        <Route path="/pendingBots/:id/:date" component={Pending} />
        <Route exact path="/bots/:id" component={Bots} />
        <Route exact path="/users/:id" component={User} />
        <Route path="/api/:topic?/:doc?" component={API}/>
        <Route path="/discord">
          <Redirect to="https://discord.gg/JEh53MQ" />
        </Route>
        <Route path="/manage/:id" component={ManageBot}/>
        <Route path="/clientinfo" component={Version}/>
        <Route path="/guidelines" component={GuideLines} />
        <Route path="/privacy" component={Privacy}/>
        <Route path="/boost" component={Boost} />
        <Route path="/partners" component={Partners} />
        <Route path="/verification" component={Trusted} />
        <Route path="/ad" component={Ad} />
        <Route component={NotFound}></Route>
        
      </Switch>
        <Container>
          {
            !["/boost", "/partners", "/verification", "/about", "/guidelines", "/privacy", "/clientinfo"].includes(window.location.pathname) && (
              <Advertisement unit="panorama" style={{ width: '100%', marginBottom: '2em', marginTop: '2em' }} test={GitInfo().branch !== 'stable' ? '광고' : null}>
                <ins class="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-4856582423981759"
                  data-ad-slot="3250141451"
                  data-ad-format="auto"
                  data-adtest="on"
                  data-full-width-responsive="true"></ins>
              </Advertisement>
            )
          }
        </Container>
      </div>
      <Footer Dark={Dark} setDark={setDark}/>

        </div>
        </ScrollTop>
        </div>
        
    </Router>
  );
}

export default App;
