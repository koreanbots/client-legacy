import React from 'react'
import fetch from 'node-fetch'
import {
  Image,
  Grid,
  Container,
  Label,
  Divider,
  Button,
  Icon,
  Message,
  Segment,
  Popup,
  Table,
  Modal,
  Form,
  TextArea,
  Advertisement
} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown/with-html'
import config from '../config'
import { Helmet } from 'react-helmet'
import CodeBlock from '../components/Code'
import GitInfo from "react-git-info/macro"

import AdSense from 'react-adsense';
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      error: {},
      isLoading: true,
      bot: {},
      popup: false,
      report: 0,
      reportCategory: '',
      reportDesc: ''
    }
  }

  getData = async id => {
    await fetch(config.api + '/bots/get/' + id, {
      method: 'GET',
      headers: {
        token: localStorage.token,
        id: localStorage.id,
        time: localStorage.date
      }
    })
      .then(r => r.json())
      .then(bot =>
        this.setState({
          bot: bot.code === 200 ? bot.data : false,
          isLoading: false,
          error: bot.code === 200 ? { code: 200 } : bot
        })
      )
  }

  voteAction = async () => {
    const res = await fetch(config.api + '/bots/vote/' + this.state.bot.id, {
      method: 'POST',
      headers: {
        token: localStorage.token,
        id: localStorage.id,
        time: localStorage.date
      }
    }).then(r => r.json())
    if (res.code !== 200) return (window.location.href = '/login')
    else {
      this.state.bot.votes = res.count
      this.state.bot.voted = res.state
      this.setState({ bot: this.state.bot })
    }
  }

  report = async () => {
    let body = {
      category: this.state.reportCategory,
      desc: this.state.reportDesc
    }
    const res = await fetch(config.api + '/bots/report/' + this.state.bot.id, {
      method: 'POST',
      headers: {
        token: localStorage.token,
        id: localStorage.id,
        time: localStorage.date,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(r => r.json())
    if (res.code !== 200) {
      this.setState({ report: res.message })
    } else {
      window.location.href = '/?message=reportSuccess'
    }
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
    const { bot, isLoading } = this.state

    return (
      <div
        style={
          (bot.boosted && bot.bg) || (bot.trusted && bot.bg)
            ? {
                background: `linear-gradient(to right, rgba(34, 36, 38, 0.68), rgba(34, 36, 38, 0.68)), url(${bot.bg}) top/cover no-repeat fixed`
              }
            : {}
        }
      >
        <Container>
          <div
            style={
              (bot.boosted && bot.bg) || (bot.trusted && bot.bg)
                ? {
                    color: 'white'
                  }
                : {}
            }
          >
            <br />

            {isLoading ? (
              <div className="loader">
                <span>Loading...</span>
              </div>
            ) : this.state.error.code === 200 ? (
              <>
                <Helmet>
                  <title>{`${bot.name} - 한국 디스코드봇 리스트`}</title>
                </Helmet>
                {bot.state === 'private' ? (
                  <Message>
                    해당 봇은 특수목적 봇이므로 초대하실 수 없습니다.
                  </Message>
                ) : bot.state === 'archived' ? (
                  <Message error>
                    해당 봇은 잠금 상태입니다.
                    <br />
                    일부 행동이 제한될 수 있습니다.
                  </Message>
                ) : (
                  <></>
                )}
                <Grid stackable divided="vertically">
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Image
                        centered
                        floated
                        src={
                          bot.avatar !== false
                            ? 'https://cdn.discordapp.com/avatars/' +
                              bot.id +
                              '/' +
                              bot.avatar +
                              '.png?size=1024'
                            : `https://cdn.discordapp.com/embed/avatars/${bot.tag %
                                5}.png?size=1024`
                        }
                        size="medium"
                        rounded
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <br />
                      <h1 style={{ fontSize: '50px' }}>{bot.name} </h1>
                      {bot.verified ? (
                        <Popup
                          content="해당봇은 디스코드측에서 인증한 봇입니다!"
                          trigger={
                            <Label
                              className="discord"
                              style={{ cursor: 'pointer' }}
                            >
                              <Icon className="icon check" /> 디스코드 인증됨
                            </Label>
                          }
                        />
                      ) : (
                        ''
                      )}

                      {bot.trusted ? (
                        <Popup
                          content="해당봇은 디스코드봇 인증을 받은 봇입니다. 엄격한 기준을 통과한 봇입니다! 더 알아보시려면 클릭해보세요!"
                          position="left"
                          trigger={
                            <Label
                              className="green"
                              href="https://github.com/koreanbots/verification"
                            >
                              <Icon className="icon certificate" /> 신뢰함
                            </Label>
                          }
                        />
                      ) : (
                        ''
                      )}
                      {bot.boosted ? (
                        <Popup
                          content={`해당봇은 공식 디스코드에 부스터가 소유하고 있는봇입니다!`}
                          position="right"
                          trigger={
                            <Label
                              style={{
                                background: '#ff73fa',
                                color: 'white',
                                cursor: 'pointer'
                              }}
                            >
                              <Icon className="icon diamond" /> 부스트
                            </Label>
                          }
                        />
                      ) : (
                        ''
                      )}
                      <br />
                      <br />
                      <Label>
                        상태
                        <Label.Detail>
                          <Icon
                            className="circle"
                            color={status[bot.status]}
                            key="status"
                          />{' '}
                          {statusText[bot.status]}
                        </Label.Detail>
                      </Label>

                      <Label>
                        접두사
                        <Label.Detail>{bot.prefix}</Label.Detail>
                      </Label>
                      <Label>
                        라이브러리
                        <Label.Detail>{bot.lib}</Label.Detail>
                      </Label>
                      <br />
                      <p style={{ marginTop: '10px', fontSize: '20px' }}>
                        {bot.intro}
                      </p>
                      <br />
                      <Label.Group tag>
                        카테고리 : <br />
                        {bot.category.length === 0
                          ? ' 지정되지 않음'
                          : bot.category.map(c => (
                              <Label as="a" key={c} href={'/categories/' + c}>
                                {c}
                              </Label>
                            ))}
                      </Label.Group>
                      <br />
                      {bot.url === false ? (
                        <Button
                          disabled={
                            bot.state === 'private' || bot.state === 'archived'
                          }
                          className="yellow"
                          content="초대하기"
                          labelPosition="left"
                          icon="plus"
                          href={`https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0`}
                        ></Button>
                      ) : (
                        <Button
                          disabled={
                            bot.state === 'private' || bot.state === 'archived'
                          }
                          className="yellow"
                          content="초대하기"
                          labelPosition="left"
                          icon="plus"
                          href={bot.url}
                        ></Button>
                      )}
                      {bot.web === false ? (
                        ''
                      ) : (
                        <Button
                          color="blue"
                          content="웹사이트"
                          labelPosition="left"
                          icon="globe"
                          href={bot.web}
                        ></Button>
                      )}
                      {bot.discord === false ? (
                        ''
                      ) : (
                        <Button
                          className="discord"
                          content="지원 디스코드"
                          labelPosition="left"
                          icon="discord"
                          href={'https://discord.gg/' + bot.discord}
                        ></Button>
                      )}
                      {bot.git === false ? (
                        ''
                      ) : (
                        <Button
                          color="black"
                          content="Git"
                          labelPosition="left"
                          icon="git"
                          href={bot.git}
                        ></Button>
                      )}

                      <Modal
                        className={localStorage.dark === 'true' ? 'darkmode' : 'lightmode'}
                        trigger={
                          <Button color="red">
                            <Icon className="flag outline" />
                            신고하기
                          </Button>
                        }
                        closeIcon
                      >
                        <Modal.Header>
                          {bot.name}#{bot.tag} 신고하기
                        </Modal.Header>
                        <Modal.Description>
                          <Container style={{ padding: '10px' }}>
                            <Form>
                              <h3>신고 구분</h3>
                              {[
                                '불법',
                                '괴롭힘, 모욕, 명예훼손',
                                '스팸, 도배, 의미없는 텍스트',
                                '폭력, 자해, 테러 옹호하거나 조장하는 컨텐츠',
                                '라이선스혹은 권리 침해',
                                'Discord ToS 위반',
                                'Koreanbots 가이드라인 위반',
                                '기타'
                              ].map(el => (
                                <Form.Radio
                                  checked={el === this.state.reportCategory}
                                  label={el}
                                  value={el}
                                  onChange={(_e, { value }) =>
                                    this.setState({ reportCategory: value })
                                  }
                                />
                              ))}
                              <h3>설명</h3>
                              <TextArea
                                maxLength={1000}
                                value={this.state.desc}
                                onChange={(_e, { value }) =>
                                  this.setState({ reportDesc: value })
                                }
                              />
                              <br />
                              <br />
                              <br />
                              지속적인 허위 신고혹은 장난 신고는 제재대상입니다.
                              <br />
                              <Button
                                primary
                                content="제출"
                                onClick={this.report}
                              />
                            </Form>
                            {this.state.report === 0 ? (
                              <></>
                            ) : (
                              <Message error>{this.state.report}</Message>
                            )}
                          </Container>
                        </Modal.Description>
                      </Modal>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Button
                        className="discord"
                        content={
                          (bot.servers === 0 ? '0' : bot.servers) + ' 서버'
                        }
                      ></Button>

                      <Button
                        basic={bot.voted === 1 ? false : true}
                        color="red"
                        content={bot.voted === 1 ? '하트 삭제' : '하트 추가'}
                        icon="heart"
                        disabled={bot.state === 'archived'}
                        label={{
                          basic: true,
                          color: 'red',
                          pointing: 'left',
                          content: bot.votes
                        }}
                        onClick={this.voteAction}
                      />

                      <br />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <div>
                  제작/개발:{' '}
                  {(bot.owners || []).map(o => (
                    <Label href={'/users/' + o.id}>
                      {o.avatar !== false ? (
                        <>
                          <Image
                            src={
                              'https://cdn.discordapp.com/avatars/' +
                              o.id +
                              '/' +
                              o.avatar +
                              '.png'
                            }
                            avatar
                          />
                          <span>
                            {' '}
                            {o.username}#{o.tag}
                          </span>
                        </>
                      ) : (
                        <>
                          <Image
                            src={`https://cdn.discordapp.com/embed/avatars/${o.tag %
                              5}.png`}
                            avatar
                          />
                          <span>
                            {' '}
                            {o.username}#{o.tag}
                          </span>
                        </>
                      )}
                    </Label>
                  ))}
                </div>
                <Advertisement unit="large leaderboard" centered style={{ marginTop: '2em', width: '100%' }} test={GitInfo().branch !== 'stable' ? '광고' : null}>
                  <AdSense.Google
                    style={{ display: 'inline-block', width: '100%', height: '90px' }}
                    client="ca-pub-4856582423981759"
                    slot="3250141451"
                    format=''
                  />
                </Advertisement>
                <Divider section />
                <Segment
                  style={{
                    wordWrap: 'break-word',
                    borderRadius: 0,
                    color: 'black'
                  }}
                >
                  <ReactMarkdown
                    source={bot.desc}
                    renderers={{
                      table: Table,
                      thead: Table.Header,
                      tr: Table.Cell,
                      code: CodeBlock
                    }}
                  />
                </Segment>
              </>
            ) : (
              <div className="loader">
                <p>{this.state.error.message}</p>
              </div>
            )}
          </div>
        </Container>
      </div>
    )
  }
}

export default Detail

const status = {
  online: 'green',
  idle: 'yellow',
  dnd: 'red',
  offline: 'gray',
  streaming: 'purple'
}

const statusText = {
  online: '온라인',
  idle: '자리 비움',
  dnd: '다른 용무중',
  offline: '오프라인',
  streaming: '방송중',
  '???': '알 수 없음'
}