import React from 'react'
import {
  Image,
  Grid,
  Container,
  Label,
  Divider,
  Button,
  Icon,
  Message, Segment
} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown/with-html'
import Redirect from '../components/Redirect'
import graphql from '../utils/graphql'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      error: null,
      isLoading: true,
      bot: {}
    }
  }

  getData = async (id, date) => {
    const res = await graphql(`query {
      submit(id: "${id}", date: ${Number(date)}) {
        id
        date
        category
        lib
        prefix
        intro
        desc
        url
        web
        git
        discord
        state
        owners {
          id
          avatar
          tag
          username
        }
        reason
      }
    }`)
    
    this.setState({
      bot: res.code === 200 && res.data.submit ? res.data.submit : false,
      isLoading: false
    })
      
  }

  componentDidMount() {
    const {
      match: {
        params: { id, date }
      }
    } = this.props
    this.getData(id, date)
  }
  render() {
    const { bot, isLoading } = this.state
    function Success() {
      return (
        <Message success>
          {' '}
          해당 봇은 이미 승인되었습니다! 봇 페이지로 리다이랙트합니다.
        </Message>
      )
    }
    return (
      <Container className="botDetail">
        <br />

        {isLoading ? (
          <div className="loader">
            <span>Loading...</span>
          </div>
        ) : bot ? (
          <>
            {bot.state === 0 ? (
              <Message info header="승인 대기중" content="해당 봇은 아직 승인 대기 상태입니다."/>
            ) : bot.state === 1 ? (
              <>
                <Redirect to={'/bots/' + bot.id} content={<Success />} />
              </>
            ) : bot.state === 2 ? (
              <Message error header="거부됨." content="아쉽게도 신청하신 해당 봇은 승인 거부 되었습니다."/>
            ) : (
              <></>
            )}
            <Grid stackable divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    floated
                    src="/img/default.png"
                    size="medium"
                    rounded
                  />
                </Grid.Column>
                <Grid.Column>
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
                          <Label as="a" key={c}>
                            {c}
                          </Label>
                        ))}
                  </Label.Group>
                  <br />
                  {bot.url ? (
                    <Button
                      color="yellow"
                      content="초대하기"
                      labelPosition="left"
                      icon="plus"
                      href={`https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0`}
                    ></Button>
                  ) : (
                    <Button
                      className="discord"
                      content="초대하기"
                      labelPosition="left"
                      icon="discord"
                      href={bot.url}
                    ></Button>
                  )}
                  {bot.web && (
                    <Button
                      color="blue"
                      content="웹사이트"
                      labelPosition="left"
                      icon="globe"
                      href={bot.web}
                    ></Button>
                  )}
                  {bot.discord && (
                    <Button
                      className="discord"
                      content="지원 디스코드"
                      labelPosition="left"
                      icon="discord"
                      href={'https://discord.gg/' + bot.discord}
                    ></Button>
                  )}
                  {bot.git && (
                    <Button
                      color="black"
                      content="Git"
                      labelPosition="left"
                      icon="git"
                      href={bot.git}
                    ></Button>
                  )}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={5}>
                <Grid.Column>
                  
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </>
        ) : (
          <div className="loader">
            <h1>심사 데이터가 삭제되었거나 존재하지 않습니다.</h1>
          </div>
        )}
        <div>
          제작/개발:{' '}
          {(bot.owners || []).map(o => (
                    <Label href={'/users/' + o.id}>
                      <Image
                        src={
                          o.avatar ?
                            'https://cdn.discordapp.com/avatars/' +
                              o.id +
                              '/' +
                              o.avatar +
                              '.png' : `https://cdn.discordapp.com/embed/avatars/${o.tag %
                              5}.png`
                          }
                        onError={ (e)=> e.target.src="/img/default.png" }
                        avatar
                        />
                        <span>
                          {' '}
                          {o.username}#{o.tag}
                        </span>
                    </Label>
                  ))}
        </div>

        <Divider section />
        <Segment style={{
                    wordWrap: 'break-word',
                    borderRadius: 0,
                    color: 'black'
                  }}
          >
          <ReactMarkdown style={{ wordWrap: 'break-word' }} source={bot.desc} />
        </Segment>
      </Container>
    )
  }
}

export default Detail

const status = {
  online: 'green',
  idle: 'yellow',
  dnd: 'red',
  offline: 'gray',
  streaming: 'purple',
  black: '알 수 없음'
}

const statusText = {
  online: '온라인',
  idle: '자리 비움',
  dnd: '다른 용무중',
  offline: '오프라인',
  streaming: '방송중',
  '???': '알 수 없음'
}
