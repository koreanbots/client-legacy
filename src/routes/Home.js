import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Bot from '../components/Bot'
import {
  Message,
  Container,
  Card,
  Pagination,
  Label
} from 'semantic-ui-react'
import Typed from 'typed.js'
import queryString from 'query-string'
import SearchField from '../components/Search'
import ads from './ads'
import { Redirect } from 'react-router-dom'
import graphql from '../utils/graphql'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      bot: {},
      trusted: {},
      message: false,
      activePage: 1,
      totalPage: 1
    }
  }
  componentWillUnmount() {
    this.typed.destroy()
  }
  removeParam = parameter => {
    var url = window.location.href
    var urlparts = url.split('?')

    if (urlparts.length >= 2) {
      var urlBase = urlparts.shift()
      var qus = urlparts.join('?')

      var prefix = encodeURIComponent(parameter) + '='
      var pars = qus.split(/[&;]/g)
      for (var i = pars.length; i-- > 0; )
        if (pars[i].lastIndexOf(prefix, 0) !== -1) pars.splice(i, 1)
      url = urlBase + '?' + pars.join('&')
      window.history.pushState('', document.title, url)
    }
    return url
  }

  editParm = (parm, val) => {
    window.history.pushState(
      '',
      document.title,
      `${window.location.origin}?${parm}=${val}`
    )
  }
  getData = async page => {
    const query = `query {
      vote: list(type: VOTE, page: ${page}) {
        type,
        totalPage,
        data {
          id
          name
          avatar
          votes
          servers
          category
          intro
          desc
          url
          state
          verified
          trusted
          vanity
          boosted
          status
          banner
          bg
        }
      }
      trusted: list(type: TRUSTED, page: ${page}) {
        type
        data {
          id
          name
          avatar
          votes
          servers
          category
          intro
          desc
          url
          state
          verified
          trusted
          vanity
          boosted
          status
          banner
          bg
        }
      }
      new: list(type: NEW, page: ${page}) {
        type
        data {
          id
          name
          avatar
          votes
          servers
          category
          intro
          desc
          url
          state
          verified
          trusted
          vanity
          boosted
          status
          banner
          bg
        }
      }
    }
    `
    const bots = await graphql(query)
    this.setState({
      bots: bots.data,
      isLoading: false,
      totalPage: bots.data ? bots.data.vote.totalPage : 0,
      code: bots.code,
      errMessage: bots.message,
      activePage: page
    })
  }
  handlePaginationChange = (e, { activePage }) => {
    this.editParm('page', activePage)
    this.getData(activePage)
  }

  componentDidMount() {
    const query = queryString.parse(window.location.search)
    const page =
      Number.isNaN(Number(query.page)) || Number(query.page) < 1
        ? 1
        : query.page
    this.setState({ activePage: page })
    if (query.message)
      this.setState({
        message: messages[query.message] || false
      })
    this.getData(page)
    this.typed = new Typed(this.el, {
      strings: cats,
      typeSpeed: 200,
      backSpeed: 100,
      loop: true,
      loopCount: Infinity
    })
  }
  handleDismiss = async () => {
    this.setState({ message: false })
    this.removeParam('message')
  }
  render() {
    const { isLoading, bots, code, errMessage } = this.state
    return (
      <>
        {this.state.activePage === 1 && (
          <>
            <div
              className="verytop"
              style={{
                padding: '10px',
                marginBottom: '10px',
                display: 'flex',
                minHeight: '370px',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <Container>
                <h1>
                  한국 디스코드봇 리스트에서{' '}
                  <span
                    style={{ whiteSpace: 'pre', fontSize: '1.2em' }}
                    ref={el => {
                      this.el = el
                    }}
                  />
                  봇을 확인하세요
                </h1>
                <h2>다양한 국내봇을 한곳에서 확인하세요!</h2>
                <SearchField fluid massive large style={{ width: '100% !important' }} />
              </Container>
            </div>
            <svg
              className="wave"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              style={{ marginTop: '-4em', width: '100%', marginBottom: '-9em' }}
            >
              <path
                fill="#7289DA"
                fillOpacity="1"
                d="M0,128L60,106.7C120,85,240,43,360,69.3C480,96,600,192,720,192C840,192,960,96,1080,69.3C1200,43,1320,85,1380,106.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              ></path>
            </svg>
            <Container>
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
              {ads.top && (
                <a href={ads.top.link}>
                  <div className="ui fluid image">
                    <a
                      className="ui top right attached label"
                      href="/ad"
                      style={{ borderRadius: 0 }}
                    >
                      광고
                    </a>
                    <img src={ads.top.img} style={{ width: '100%' }} />
                  </div>
                </a>
              )}
            </Container>
          </>
        )}

        <Container>
          <HelmetProvider>
            <title>한국 디스코드봇 리스트</title>
            <meta
              name="description"
              content="국내 디스코드봇들을 확인하고, 초대해보세요!"
            />
          </HelmetProvider>
          <h3 style={{ marginTop: '30px' }}>카테고리로 빠르게 찾아보기: </h3>
          {cats.map(r => (
            <>
              <Label
                tag
                stackable={true}
                style={{ marginTop: '4px' }}
                href={'/categories/' + r}
              >
                {r}
              </Label>{' '}
            </>
          ))}
          {
            code !== 200 ? (
              <div className="loader">
                    <span>{errMessage}</span>
                  </div>
            ) : (
              <>
              <section id="all" style={{ marginTop: '15px' }}>
            <h1>💖 하트 랭킹</h1>
            <p>하트를 많이 받은 봇들의 순위입니다!</p>
            {isLoading && code !== 200 ? (
              <div className="loader">
                <span className="loader__text"></span>
              </div>
            ) : code === 401 ? (
              <Redirect to="/logout" />
            ) : (
              <div>
                <Card.Group itemsPerRow={3} stackable>
                  {bots.vote.data.map(bot => (
                    <>
                      <Bot
                        key={bot.id}
                        id={bot.id}
                        name={bot.name}
                        avatar={
                          bot.avatar
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
                          bot.url
                            ? `https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0`
                            : bot.url
                        }
                        state={bot.state}
                        count={
                          bots.vote.data.findIndex(r => r.id === bot.id) +
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
          {ads.bottom && (
            <a href={ads.bottom.link}>
              <div className="ui fluid image">
                <a
                  className="ui top right attached label"
                  href="/ad"
                  style={{ borderRadius: 0 }}
                >
                  광고
                </a>
                <img src={ads.bottom.img} style={{ width: '100%' }} />
              </div>
            </a>
          )}
          {this.state.activePage === 1 ? (
            <>
              <section id="new" style={{ marginTop: '15px' }}>
                <h1>➕ 새로운 봇</h1>
                <p>
                  최근에 한국 디스코드봇 리스트에 추가된 따끈따끈한 봇입니다.
                </p>
                {isLoading && code !== 200 ? (
                  <div className="loader">
                    <span className="loader__text">Loading...</span>
                  </div>
                ) : code === 401 ? (
                    <Redirect to="/logout" />
                ) : (
                  <div>
                    <Card.Group itemsPerRow={3} stackable>
                      {bots.new.data.slice(0, 6).map(n => (
                        <>
                          <Bot
                            key={n.id}
                            id={n.id}
                            name={n.name}
                            avatar={
                              n.avatar !== false
                                ? 'https://cdn.discordapp.com/avatars/' +
                                  n.id +
                                  '/' +
                                  n.avatar +
                                  '.png?size=128'
                                : `https://cdn.discordapp.com/embed/avatars/${n.tag %
                                    5}.png?size=128`
                            }
                            votes={n.votes}
                            servers={n.servers}
                            category={n.category}
                            intro={n.intro}
                            desc={n.desc}
                            invite={
                              n.url
                                ? `https://discordapp.com/oauth2/authorize?client_id=${n.id}&scope=bot&permissions=0`
                                : n.url
                            }
                            state={n.state}
                            verified={n.verified}
                            trusted={n.trusted}
                            vanity={n.vanity}
                            boosted={n.boosted}
                            status={n.status}
                            banner={n.banner}
                            bg={n.bg}
                          />
                        </>
                      ))}
                    </Card.Group>
                  </div>
                )}
              </section>
              <h1>✅ 신뢰된 봇</h1>
              <p>KOREANBOTS에서 인증받은 신뢰할 수 있는 봇들입니다!!</p>
              { isLoading && code !== 200 ? (
                <div className="loader">
                  <span className="loader__text">Loading...</span>
                </div>
              ) : code === 401 ? (
                <Redirect to="/logout" />
              ) : (
                <div>
                  <Card.Group itemsPerRow={3} stackable>
                    {bots.trusted.data.slice(0, 6).map(trusted => (
                      <>
                        <Bot
                          key={trusted.id}
                          id={trusted.id}
                          name={trusted.name}
                          avatar={
                            trusted.avatar
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
                            trusted.url 
                              ? `https://discordapp.com/oauth2/authorize?client_id=${trusted.id}&scope=bot&permissions=0`
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
          ) : (
            ''
          )}
              </>
            )
          }
          <br />
          <br />
        </Container>
      </>
    )
  }
}

export default Home

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
  },
  reportSuccess: {
    level: 'success',
    title: '봇 신고 성공!',
    message: '신고 내용이 관리자에게 전달되었습니다.'
  },
  delete: {
    level: 'success',
    title: '봇 삭제 성공!',
    message: '봇이 삭제처리되셨습니다.'
  }
}

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
]
