import React from 'react'
import { Container, Item, Button, Icon, Card, Divider } from 'semantic-ui-react'

import Redirect from '../components/Redirect'
import config from '../config'
import { HelmetProvider } from 'react-helmet-async'
import graphql from '../utils/graphql'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: { code: 401 },
      isLoading: true
    }
  }

  getProfile = async () => {
    const res = await graphql(`query {
      me {
        id
        avatar
        tag
        username
        perm
        github
        bots {
          id
          name
          tag
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
        }
      }
      submits {
        id
        date
        intro
        state
        reason
      }
      reports {
        id
        type
        state
        category
        desc
        bot {
          id
          name
          tag
          avatar
        }
      }
      stars {
        id
        name
        tag
        avatar
        intro
        vanity
      }
    }`)

    this.setState({ result: res, isLoading: false })
  }
  componentDidMount() {
    this.getProfile()
  }
  render() {
    if (!localStorage.token)
      return (
        <div className="loader">
          <h1>로그인 해주세요!</h1>
        </div>
      )
    const { result } = this.state
    return (
      <Container>
        <HelmetProvider>
          <title>관리패널 - 한국 디스코드봇 리스트</title>
          <meta
            name="description"
            content="자신의 봇들을 관리하고, 하트를 관리하거나, 심사결과를 확인하세요"
          />
        </HelmetProvider>

        {this.state.isLoading ? (
          <div className="loader">
            <span>Loading...</span>
          </div>
        ) : result.code !== 200 ? (
          result.code === 401 ? (
            <Redirect
              to={config.url}
              content={<>d</>}
            />
          ) : (
            <div className="loader">
              <span>{result.message}</span>
            </div>
          )
        ) : (
          <div>
            <br />
            <h1>관리패널</h1>
            <Button
              href={'/users/' + result.data.me.id}
              content="프로필 보기"
              icon="right arrow"
              labelPosition="right"
            />
            <Button
              color="black"
              content={result.data.me.github ? "깃허브 계정 업데이트하기" : "깃허브 계정 추가하기"}
              icon="github"
              labelPosition="right"
              onClick={()=> window.open(config.github, "Github", "width = 1100, height = 800")}
              />
            <h2>나의 봇</h2>
            <Button
              href="/addbot"
              content="새로운 봇 추가하기"
              icon="plus"
              labelPosition="left"
            />
            <br />
            <br />
            {result.data.me.bots.length === 0 ? (
              <h3>소유하고 있는 봇이 있습니다.</h3>
            ) : (
              <>
                <Card.Group stackable itemsPerRow={3}>
                  {result.data.me.bots.map(bot => (
                    <MyBots {...bot} />
                  ))}
                </Card.Group>
                <br />
              </>
            )}
            <Divider />
            <h2>즐겨찾기</h2>
            {result.data.stars.length === 0 ? (
              <h3>즐겨찾기에 등록한 봇이 없습니다.</h3>
            ) : (
              <>
                <Card.Group stackable itemsPerRow={4}>
                  {result.data.stars.map(bot => (
                    <MyBots {...bot} ignoreExtra={true} ignoreMeta={true}/>
                  ))}
                </Card.Group>
                <br />
              </>
            )}
            <Divider />
            <h2>심사이력</h2>
            <p>신청하신 내용을 보시려면 카드를 클릭해주세요!</p>
            {
              result.data.submits.length !== 0 ? (
                <>
                <Card.Group stackable itemsPerRow={4}>
                  {
                    result.data.submits.map(bot => (
                      <Submitted {...bot} />
                    ))
                  }
                </Card.Group>
                <br/>
                본인의 봇이 거부되셨나요? <a href="https://docs.koreanbots.dev/bots/submit">해당 문서</a>를 확인해주세요.
                </>
              ) : (
                <h3>심사이력이 없습니다.</h3>
              )
            }
            <Divider />
            <h2>신고내역</h2>
            <p>신고내역을 확인하시려면 카드를 클릭해주세요!</p>
            {
              result.data.reports.length !== 0 ? (
                <>
                <Card.Group stackable itemsPerRow={4}>
                  {
                    result.data.reports.reverse().map(report => (
                      <Reports {...report} />
                    ))
                  }
                </Card.Group>
                </>
              ) : (
                <h3>신고내역이 없습니다.</h3>
              )
            }
          </div>
        )}
        <br />
      </Container>
    )
  }
}

export default Detail

const stateColor = ['gray', 'green', 'red']
const state = ['심사중', '승인됨', '거부됨']


function MyBots(props) {
  const bot  = props
  return (
    <Card href={bot.ignoreExtra ?
      '/bots/' +
      ((bot.vanity && bot.boosted) || (bot.vanity && bot.trusted)
        ? bot.vanity
        : bot.id)
     : null}>
      <Card.Content>
        <Card.Header href={
              '/bots/' +
              ((bot.vanity && bot.boosted) || (bot.vanity && bot.trusted)
                ? bot.vanity
                : bot.id)
            }>
          {' '}
          <Item.Image
            floated="right"
            src={
              bot.avatar
                ? 'https://cdn.discordapp.com/avatars/' +
                  bot.id +
                  '/' +
                  bot.avatar +
                  '.png'
                : `https://cdn.discordapp.com/embed/avatars/${bot.tag % 5}.png`
            }
            wrapped
            ui={false}
            avatar
            onError={ (e)=> e.target.src="/img/default.png" }
          />
          {bot.name}
        </Card.Header>
        {
          !bot.ignoreMeta && (
          <Card.Meta>
            <a style={{ color: '#7289DA' }}>{bot.servers} 서버</a> |{' '}
            <a style={{ color: 'red' }}>
              {bot.votes} <Icon className="heart" />
            </a>
          </Card.Meta>
          )
        }
        <Card.Description>{bot.intro}</Card.Description>
      </Card.Content>
      {
        !bot.ignoreExtra && (
          <Card.Content extra>
            <div className="ui two buttons">
              <Button inverted
                href={'/manage/' + bot.id}
                color="green"
                
              >
                관리하기
              </Button>
            </div>
          </Card.Content>
        )
      }
    </Card>
  )
}

function Submitted(props) {
  const bot = props
  return (
    <Card
      href={
        bot.state === 1
          ? '/bots/' + ((bot.vanity && bot.boosted) || (bot.vanity && bot.trusted)
          ? bot.vanity
          : bot.id)
          : '/pendingBots/' + bot.id + '/' + bot.date
      }
    >
      <Card.Content>
        <Card.Header>
          <a>{bot.id}</a>
        </Card.Header>
        <Card.Meta>
          상태:{' '}
          <a style={{ color: stateColor[bot.state] }}>{state[bot.state]}</a><br/>
          { bot.state === 2 && `사유: ${bot.reason || '없음.'}`}
        </Card.Meta>
        <Card.Description>
          설명:
          {bot.intro}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

function Reports(props) {
  const report = props
  return (
    <Card
      href={
        '/report/' + report.id
      }
    >
      <Card.Content>
        <Card.Header>
          <a>#{report.id}</a>
        </Card.Header>
        <Card.Meta>
          상태:{' '}
          <a style={{ color: stateColor[report.state === 0 ? 0 : 1] }}>{report.state === 0 ? '대기 중' : '답변 완료'}</a><br/>
        </Card.Meta>
        <Card.Description>
          신고 내용: 
          {
            report.type === 'bot' ? `${report.bot.name}#${report.bot.tag}` : ''
          } - { report.category }
        </Card.Description>
      </Card.Content>
    </Card>
  )
}
