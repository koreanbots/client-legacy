import React from 'react'

import {
  Image,
  Grid,
  Container,
  Label,
  Card,
  Icon,
  Popup
} from 'semantic-ui-react'
import { HelmetProvider } from 'react-helmet-async'
import Bot from '../components/Bot'
import graphql from '../utils/graphql'
import Permission from '../utils/permission'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      isLoading: true,
      error: '',
      user: localStorage.userCache ? JSON.parse(localStorage.userCache) : { }
    }
  }

  getData = async id => {
    const user = await graphql(`query {
      user(id: "${encodeURIComponent(id)}") {
        id
        avatar
        tag
        username
        perm
        github
        bots {
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
    }`)
   
        this.setState({
          data: user.code === 200 && user.data.user ? user.data.user : null,
          error: user.code !== 200 ? user.message : !user.data.user ? '해당 유저가 존재하지 않습니다' : '',
          isLoading: false
        })
  }

  shuffle = a => {
    var j, x, i
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }
    return a
  }

  componentDidMount(props) {
    const {
      match: {
        params: { id }
      }
    } = this.props
    this.getData(id)
  }
  render() {
    const { data, isLoading, error } = this.state
    return (
      <Container>
        <div>
          <br />

          {isLoading ? (
            <div className="loader">
              <span>Loading...</span>
            </div>
          ) : data && !error ? (
            <>
              <HelmetProvider>
                <title>{`${data.username}#${data.tag} - 한국 디스코드봇 리스트`}</title>
              </HelmetProvider>
              <Grid stackable divided="vertically">
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <br/>
                    <Image
                      centered
                      floated
                      src={
                        data.avatar
                          ? 'https://cdn.discordapp.com/avatars/' +
                            data.id +
                            '/' +
                            data.avatar +
                            (data.avatar.startsWith('a_') ? '.gif' : '.png') + '?size=1024'
                          : `https://cdn.discordapp.com/embed/avatars/${data.tag %
                              5}.png?size=1024`
                      }
                      size="medium"
                      rounded
                      onError={ (e)=> e.target.src="/img/default.png" }
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <br />
                    <h1 style={{ fontSize: '40px' }}>
                      {data.username}
                      <h2 style={{ color: 'gray' }}>#{data.tag}</h2>
                    </h1>
                    {Permission.check(data.perm, 'staff') && (
                      <Popup
                        content="해당 유저는 관리자입니다."
                        trigger={
                          <Label
                            className="yellow"
                            style={{ cursor: 'pointer' }}
                          >
                            <Icon className="icon star" /> STAFF
                          </Label>
                        }
                      />
                    )}

                    {Permission.check(data.perm, 'bughunter') && (
                      <Popup
                        content="해당 유저는 버그헌터입니다."
                        trigger={
                          <Label
                            className="green"
                            style={{ cursor: 'pointer' }}
                          >
                            <Icon className="icon bug " /> 버그헌터
                          </Label>
                        }
                      />
                    )}

                    {Permission.check(data.perm, 'booster') && (
                      <Popup
                        content="해당 유저는 디스코드 서버 부스터입니다."
                        trigger={
                          <Label
                            className="noHover boosted"
                            style={{ cursor: 'pointer' }}
                            href="/boost"
                          >
                            <Icon className="icon gem" /> 부스터
                          </Label>
                        }
                      />
                    )}
                    <br/>
                   
                    {
                      data.github && (
                    <>
                      <Label style={{ marginTop: '20px' }} href={`https://github.com/${data.github}`}>
                      <Icon className="github" />
                      { data.github }
                      </Label>
                    </>
                        
                      )
                    }
                    <br/>
                    {
                      this.state.user.id === data.id && (
                        <Label style={{ marginTop: '20px' }} href="/panel">
                          <Icon className="settings" /> 관리하기
                        </Label>
                      )
                    }
                    
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                  <Grid.Column>
                    <br />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <div>
                <h2>제작한 봇</h2>
                <p>{data.username}님이 개발에 참여하였거나 관리하는 봇입니다.</p>
                {data.bots ? (
                  <Card.Group itemsPerRow={3} stackable>
                    {data.bots.map(bot => (
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
                        verified={bot.verified}
                        trusted={bot.trusted}
                        vanity={bot.vanity}
                        boosted={bot.boosted}
                        status={bot.status}
                        banner={bot.banner}
                        bg={bot.bg}
                      />
                    ))}
                  </Card.Group>
                ) : (
                  <h3>소유한 봇이 없습니다.</h3>
                )}
              </div>
            </>
          ) : (
            <div className="loader">
              <p>{this.state.error.message}</p>
            </div>
          )}
        </div>
        <br />
        <br />
      </Container>
    )
  }
}

export default User
