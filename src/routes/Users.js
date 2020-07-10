import React from 'react'
import fetch from 'node-fetch'
import {
  Image,
  Grid,
  Container,
  Label,
  Divider,
  Card,
  Icon,
  Message,
  Segment,
  Popup,
  Table,
  Modal,
  Form,
  TextArea
} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown/with-html'
import config from '../config'
import { Helmet } from 'react-helmet'
import CodeBlock from '../components/Code'
import Bot from '../components/Bot'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      isLoading: true,
      error: ''
    }
  }

  getData = async id => {
    await fetch(config.api + '/users/' + id, {
      method: 'GET'
    })
      .then(r => r.json())
      .then(user => {
        console.log(user)
        this.setState({
          data: user.code === 200 ? user.user : null,
          error: user.code !== 200 ? user.message : '',
          isLoading: false
        })
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
              <Helmet>
                <title>{`${data.username}#${data.tag} - 한국 디스코드봇 리스트`}</title>
              </Helmet>
              <Grid stackable divided="vertically">
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Image
                      centered
                      floated
                      src={
                        data.avatar !== false
                          ? 'https://cdn.discordapp.com/avatars/' +
                            data.id +
                            '/' +
                            data.avatar +
                            '.png?size=1024'
                          : `https://cdn.discordapp.com/embed/avatars/${data.tag %
                              5}.png?size=1024`
                      }
                      size="medium"
                      rounded
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <br />
                    <h1 style={{ fontSize: '40px' }}>
                      {data.username}
                      <h2 style={{ color: 'gray' }}>#{data.tag}</h2>
                    </h1>
                    {data.perm === 'admin' ? (
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
                    ) : (
                      ''
                    )}
                    <br/>
                   
                    {
                      data.github ? (
                    <>
                      <Label style={{ marginTop: '20px' }} href={`https://github.com/${data.github}`}>
                      <Icon className="github" />
                      { data.github }
                      </Label>
                    </>
                        
                      ) : ("")
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
                <p>해당 유저에 개발하였거나, 관리하는 봇입니다.</p>
                {data.bots ? (
                  <Card.Group itemsPerRow={3} stackable>
                    {data.bots.map(bot => (
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
              <Divider section />
              <div>
                <h2>하트를 남긴 봇</h2>
                <p>최대 5개까지만 랜덤으로 표시됩니다.</p>
                {data.votes ? (
                  <Card.Group itemsPerRow={3} stackable>
                    {this.shuffle(data.votes)
                      .slice(0, 5)
                      .map(bot => (
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
                          verified={bot.verified}
                          trusted={bot.trusted}
                          vanity={bot.vanity}
                          boosted={bot.boosted}
                          status={bot.status}
                          banner={bot.banner}
                          bg={bot.bg}
                        />
                      ))}
                    {data.votes.length - 5 > 0 ? (
                      <Card>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                          }}
                        >
                          <h1>+{data.votes.length - 5}개</h1>
                        </div>
                      </Card>
                    ) : (
                      <></>
                    )}
                  </Card.Group>
                ) : (
                  <h3>하트를 남긴 봇이 없습니다.</h3>
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
