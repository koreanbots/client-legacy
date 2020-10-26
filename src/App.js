import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Sentry from "@sentry/react";

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
      <Sentry.ErrorBoundary fallback={<ServiceNotAvailable title="오류 내용은 개발팀에 전달되었습니다." desc="버그라고 생각되신다면 버그를 제보해주세요!"/>} showDialog dialogOptions={{ title: '처리중에 문제가 발생한 것 같습니다.', subtitle: '오류가 개발팀에게 전달되었지만 오류를 더 자세히 알려주신다면 문제 해결에 도움이 될거 같습니다.', subtitle2: '깃허브 이슈로 버그를 제보해주시면 빠르게 처리해드릴 수 있습니다!',labelName: '이름', labelEmail: '이메일', labelComments: '무슨 일이 발생했나요?', labelClose: '닫기', labelSubmit: '제출', errorGeneric: '신고를 접수하는 중에 알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.', errorFormEntry: '올바르지 않은 항목이 있습니다. 올바르게 입력하시고 다시 시도해주세요.', successMessage: '피드백이 제출되었습니다. 감사합니다! 더 자세한 내용은 이메일로 알려드리겠습니다.' }}>
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
      </Sentry.ErrorBoundary>
        </div>
        <Footer Dark={Dark} setDark={setDark}/>
        </ScrollTop>
        </div>
        
    </Router>
  );
}

export default App;
