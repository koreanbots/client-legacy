import React from 'react';
import {Helmet} from 'react-helmet'
import fetch from 'node-fetch';
import Bot from '../components/Bot';
import { Message, Container, Card, Pagination, Label } from 'semantic-ui-react';
import config from '../config';

import queryString from 'query-string';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bot: {},
      trusted: {},
      message: false,
      activePage: 1,
      totalPage: 1
    };
  }

  removeParam = parameter => {
    var url = window.location.href;
    var urlparts = url.split('?');

    if (urlparts.length >= 2) {
      var urlBase = urlparts.shift();
      var qus = urlparts.join('?');

      var prefix = encodeURIComponent(parameter) + '=';
      var pars = qus.split(/[&;]/g);
      for (var i = pars.length; i-- > 0; )
        if (pars[i].lastIndexOf(prefix, 0) !== -1) pars.splice(i, 1);
      url = urlBase + '?' + pars.join('&');
      window.history.pushState('', document.title, url);
    }
    return url;
  };

  editParm = (parm, val) => {
    window.history.pushState(
      '',
      document.title,
      `${window.location.origin}?${parm}=${val}`
    );
  };
  getData = async page => {
    const bot = await fetch(config.api + '/bots/get?page=' + page, {
      method: 'GET',
      headers: {
        token: localStorage.token,
        id: localStorage.id,
        time: localStorage.date
      }
    }).then(r => r.json());

    const trusted = await fetch(config.api + '/bots/trusted').then(r=> r.json())
    this.setState({
      bot,
      trusted,
      isLoading: false,
      totalPage: bot.totalPage,
      activePage: page
    });
  };
  handlePaginationChange = (e, { activePage }) => {
    this.editParm('page', activePage);
    this.getData(activePage);
  };

  componentDidMount() {
    const query = queryString.parse(window.location.search);
    const page =
      Number.isNaN(Number(query.page)) || Number(query.page) < 1
        ? 1
        : query.page;
    this.setState({ activePage: page });
    if (query.message)
      this.setState({
        message: messages[query.message] || false
      });
    this.getData(page);
  }
  handleDismiss = async () => {
    this.setState({ message: false });
    this.removeParam('message');
  };
  render() {
    const { isLoading, bot, trusted } = this.state;

    return (
      <Container>
      <Helmet>
        <title>한국 디스코드봇 리스트</title>
        <meta name="description" content="한국 디스코드봇 리스트는 한국인 개발자가 개발한 디스코드봇을 확인하시고, 초대할 수 있는 공간입니다!" />
      </Helmet>
        {this.state.message ? (
          <Message
            header={this.state.message.title}
            onDismiss={this.handleDismiss}
            className={this.state.message.level}
            content={this.state.message.message}
          />
        ) : (
          ''
        )}

        <section id="all">
          <br />
          <h3>카테고리로 빠르게 찾아보기: </h3>
          {cats.map(r => (
            <>
              <Label
                tag
                stackable
                style={{ marginTop: '4px' }}
                href={'/categories/' + r}
              >
                {r}
              </Label>{' '}
            </>
          ))}
          <br />
          <br />
          <h1>💖 하트 랭킹</h1>
          <p>하트를 많이 받은 봇들의 순위입니다!</p>
          {isLoading ? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ) : bot.code !== 200 ? (
            <div className="loader">
              <span className="loader__text">{bot.message}</span>
            </div>
          ) : (
            <div>


              <Card.Group itemsPerRow={3} stackable>
                {bot.data.map(bot => (
                  <>
                    <Bot
                      key={bot.id}
                      id={bot.id}
                      name={bot.name}
                      avatar={
                        bot.avatar !== false
                          ? 'https://cdn.discordapp.com/avatars/' +
                            bot.id +
                            '/' +
                            bot.avatar +
                            '.png?size=128'
                          : `https://cdn.discordapp.com/embed/avatars/${bot.tag %
                              5}.png?size=128`
                      }
                      votes={bot.votes}
                      servers={bot.servers}
                      category={bot.category}
                      intro={bot.intro}
                      desc={bot.desc}
                      invite={
                        bot.url === false
                          ? `https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0`
                          : bot.url
                      }
                      state={bot.state}
                      count={
                        this.state.bot.data.findIndex(r => r.id === bot.id) +
                        (this.state.activePage - 1) * 9
                      }
                      verified={bot.verified}
                      trusted={bot.trusted}
                      vanity={bot.vanity}
                      boosted={bot.boosted}
                      status={bot.status}
                      banner={bot.banner}
                      bg={bot.bg}
                    />
                  </>
                ))}
              </Card.Group>
              <Container align="center">
                <br />
                <Pagination
                  href="#"
                  boundaryRange={0}
                  siblingRange={1}
                  ellipsisItem={null}
                  activePage={this.state.activePage}
                  totalPages={this.state.totalPage}
                  onPageChange={this.handlePaginationChange}
                />
              </Container>
            </div>
          )}
          <br />
        </section>

        {
          this.state.activePage === 1 ? (
            <>
            <h1>✅ 신뢰된 봇</h1>
            <p>KOREANBOTS에서 인증받은 신뢰할 수 있는 봇들입니다!!</p>
          {isLoading ? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ) : trusted.code !== 200 ? (
            <div className="loader">
              <span className="loader__text">{trusted.message}</span>
            </div>
          ) : (
            <div>

              <Card.Group itemsPerRow={3} stackable>
                {trusted.data.map(trusted => (
                  <>
                    <Bot
                      key={trusted.id}
                      id={trusted.id}
                      name={trusted.name}
                      avatar={
                        trusted.avatar !== false
                          ? 'https://cdn.discordapp.com/avatars/' +
                            trusted.id +
                            '/' +
                            trusted.avatar +
                            '.png?size=128'
                          : `https://cdn.discordapp.com/embed/avatars/${trusted.tag %
                              5}.png?size=128`
                      }
                      votes={trusted.votes}
                      servers={trusted.servers}
                      category={trusted.category}
                      intro={trusted.intro}
                      desc={trusted.desc}
                      invite={
                        trusted.url === false
                          ? `https://discordapp.com/oauth2/authorize?client_id=${trusted.id}&scope=trusted&permissions=0`
                          : trusted.url
                      }
                      state={trusted.state}
                      verified={trusted.verified}
                      trusted={trusted.trusted}
                      vanity={trusted.vanity}
                      boosted={trusted.boosted}
                      status={trusted.status}
                      banner={trusted.banner}
                      bg={trusted.bg}
                    />
                  </>
                ))}
              </Card.Group>
            </div>
          )}
            </>
          ) : ('')
        }
        <br/><br/>
      </Container>
    );
  }
}

export default Home;

const messages = {
  submitSuccess: {
    level: 'success',
    title: '봇 신청 성공!',
    message: '봇을 성공적으로 신청하였습니다! 신난다! 곧 다시 연락드리겠습니다!'
  },
  editSuccess: {
    level: 'success',
    title: '봇 정보 수정 성공!',
    message: '봇의 정보를 성공적으로 수정했습니다! 오예!'
  },
  lockOn: {
    level: 'success',
    title: '봇 잠금 성공!',
    message: '봇의 잠금을 성공했습니다! 이제 더 이상 초대할 수 없습니다.'
  },
  lockOff: {
    level: 'success',
    title: '봇 잠금 해제 성공!',
    message: '봇의 잠금해제를 성공했습니다! 다시 초대가 허용됩니다.'
  }
};

const cats = [
  '관리',
  '뮤직',
  '전적',
  '웹 대시보드',
  '로깅',
  '도박',
  '게임',
  '밈',
  '레벨링',
  '유틸리티',
  '번역',
  '대화',
  'NSFW',
  '검색'
];
