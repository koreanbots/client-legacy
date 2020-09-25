import React from 'react'
import Bot from '../components/Bot'
import Adsense from '../components/Advertisement'
import { Message, Container, Card, Pagination, Label, Button, Icon } from 'semantic-ui-react'

import queryString from 'query-string'
import { HelmetProvider } from 'react-helmet-async'
import graphql from '../utils/graphql'

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      bot: {},
      message: false,
      activePage: 1,
      totalPage: 1
    }
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
      window.history.pushState('', document.title, url) // added this line to push the new url directly to url bar .
    }
    return url
  }

  editParm = (parm, val) => {
    return `${window.location.origin}${window.location.pathname}?${parm}=${val}`
  }
  getData = async page => {
    const bot = await graphql(`query {
      list( type: CATEGORY, query: "${this.props.match.params.category.replace(/"/gi, '\\"')}", page: ${page}) {
        totalPage
        data {
          id
          tag
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
        }
      }
  }`)
  console.log(bot)
    this.setState({
      bot,
      isLoading: false,
      totalPage: bot.data && bot.data.list.totalPage,
      activePage: page,
      nsfw: !!localStorage.nsfw
    })
  }
  handlePaginationChange = (_e, { activePage }) => {
    window.location.href = this.editParm('page', activePage)
  }

  componentDidMount() {
    const query = queryString.parse(window.location.search)
    const page =
      Number.isNaN(Number(query.page)) || Number(query.page) < 1
        ? 1
        : query.page
    this.setState({ activePage: page })
    this.getData(page)
  }
  render() {
    const { isLoading, bot } = this.state

    return (
      <Container style={{ paddingBottom: '30px' }}>
        <HelmetProvider>
          <title>
            {this.props.match.params.category} 카테고리 봇들 - 한국 디스코드봇
            리스트
          </title>
          <meta
            name="description"
            content={`${this.props.match.params.category} 카테고리 봇들입니다. 당신의 서버로 초대해보세요!`}
          />
        </HelmetProvider>
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
        <br />
        <section>
          {isLoading ? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ) : bot.code !== 200 ? (
            <div className="loader">
              <span className="loader__text">{bot.message}</span>
            </div>
          ) : !this.state.nsfw && this.props.match.params.category === 'NSFW' ? (
            <div className="loader">
              <div>
              <h1>NSFW 카테고리는 만19세 이상의 성인만 열람하실 수 있습니다.</h1>
              <p>계속하시겠습니까?</p>
              <Button onClick={()=> { localStorage.nsfw = '아이유 예뻐요'; window.location.reload() }}>계속하기 <Icon className="arrow right"/></Button>
              </div>
            </div>
          ) : (
            <div>
              <h3>
                {' '}
                <Label tag size="large">
                  {this.props.match.params.category}
                </Label>{' '}
                카테고리 봇들
              </h3>
              <br />
              <Card.Group itemsPerRow={3} stackable>
                {bot.data.list.data.map(b => (
                  <>
                    <Bot
                      data={b}
                      key={b.id}
                      id={b.id}
                      name={b.name}
                      avatar={
                        b.avatar
                          ? 'https://cdn.discordapp.com/avatars/' +
                            b.id +
                            '/' +
                            b.avatar +
                            '.png'
                          : `https://cdn.discordapp.com/embed/avatars/${b.tag %
                              5}.png`
                      }
                      votes={b.votes}
                      servers={b.servers}
                      category={b.category}
                      intro={b.intro}
                      desc={b.desc}
                      invite={
                        !b.url
                          ? `https://discordapp.com/oauth2/authorize?client_id=${b.id}&scope=bot&permissions=0`
                          : b.url
                      }
                      state={b.state}
                      count={
                        bot.data.list.data.findIndex(r => r.id === b.id) +
                        (this.state.activePage - 1) * 9
                      }
                      verified={b.verified}
                      trusted={b.trusted}
                      vanity={b.vanity}
                      boosted={b.boosted}
                      status={b.status}
                      banner={b.banner}
                      bg={b.bg}
                    />
                  </>
                ))}
              </Card.Group>
              <br />
              <Container textAlign="center">
                <Pagination
                  boundaryRange={0}
                  siblingRange={1}
                  ellipsisItem={null}
                  activePage={this.state.activePage}
                  totalPages={this.state.totalPage}
                  onPageChange={this.handlePaginationChange}
                />
              </Container>
              <br />
            </div>
          )
          }
        </section>
        <Adsense />
      </Container>
    )
  }
}

export default Category
