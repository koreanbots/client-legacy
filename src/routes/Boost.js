import React from 'react'
import Typed from 'typed.js'
import {
  Container,
  Card,
  Icon,
  Label,
  Segment,
  Image,
  Popup,
  Divider
} from 'semantic-ui-react'
import Bot from '../components/Bot'
import { HelmetProvider } from 'react-helmet-async'
import Article from '../components/Article'

class Boost extends React.Component {
  componentDidMount() {
    // If you want to pass more options as props, simply add
    // your desired props to this destructuring assignment.
    // You can pass other options here, such as typing speed, back speed, etc. 
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, {
      strings: ['iubot', 'hellobot', 'coolbot', 'mybot'],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
      loopCount: Infinity
    })
  }

  componentWillUnmount() {
    // Make sure to destroy Typed instance on unmounting
    // to prevent memory leaks
    this.typed.destroy()
  }
  render() {
    return (
      <Article title="부스터 혜택" description="디스코드 서버를 부스트 해주신 멋진 분들에게 드리는 혜택이에요!">
        <h2>부스터 티어1</h2>
        <h3>한 개이상의 부스트를 해주신 분이 해당해요!</h3>
        <Card.Group itemsPerRow={3} stackable>
          <Card>
            <Card.Content>
              <Card.Header>
                <Icon className="paint brush" /> 미리보기 배경
              </Card.Header>
              멋진 미리보기 배경으로 유저들의 눈을 사로잡아요!
              <Segment textAlign="left">
                <Bot
                  name="완전 멋진 봇"
                  category={['관리', '게임', '밈', '전적']}
                  status="streaming"
                  state="example"
                  servers={9999}
                  votes={9999}
                  banner={'https://i.imgur.com/dqx9aw9.gif'}
                  boosted={true}
                />
              </Segment>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>
                <Icon className="id outline badge" /> 멋진 뱃지
              </Card.Header>
              멋진 뱃지를 봇 프로필에 표시해드립니다!
              <Segment textAlign="left" className="botDetail">
                <br />
                <h1 style={{ fontSize: '50px' }}>봇의 이름은</h1>
                <Popup
                  content={`해당봇은 공식 디스코드에 부스터가 소유하고 있는봇입니다!`}
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
                <br />
                <br />
                <Label>
                  상태
                  <Label.Detail>
                    <Icon className="circle" color="purple" key="status" />{' '}
                    방송중
                  </Label.Detail>
                </Label>

                <Label>
                  접두사
                  <Label.Detail>!</Label.Detail>
                </Label>
                <Label>
                  라이브러리
                  <Label.Detail>Eris</Label.Detail>
                </Label>
                <br />
                <p style={{ marginTop: '10px', fontSize: '20px' }}>
                  신나는 봇!
                </p>
                <br />
                <Label.Group tag>
                  카테고리 : <br />
                  <Label as="a" href="#">
                    관리
                  </Label>
                </Label.Group>
                <br />
              </Segment>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>
                <Icon className="at" />
                디스코드 서버 혜택
              </Card.Header>
              공식 디스코드에서 별명 변경 권한부터, 아름다운 역할색 그리고
              특별한 역할을 부여받으세요!
              <br />
              <Image
                src="/img/booster-discord.png"
                style={{ height: '85%', marginTop: '10px' }}
              />
            </Card.Content>
          </Card>
          <Card style={{ width: '100%' }}>
            <Card.Content>
              <Card.Header>
                <Icon className="ban" />
                광고 없음
              </Card.Header>
              봇 페이지에 광고가 표시되지 않습니다.<br/>
              방문자들이 쾌적하게 봇 페이지를 볼 수 있습니다.
              
            </Card.Content>
          </Card>
        </Card.Group>
        <Divider />
        <h2>부스터 티어2</h2>
        <h3>2개 이상의 부스트를 해주신 분께 드리는 혜택입니다!</h3>
        <Card.Group itemsPerRow={3} stackable>
          <Card>
            <Card.Content>
              <Card.Header>
                <Icon className="star" />
                티어1 혜택
              </Card.Header>

              <h4 style={{ marginTop: '1em' }}>
                <Image src="/img/booster.png" />
                <br />
                <br />
                모든 티어1 혜택을 이용할 수 있어요! <br />
                오예 신난다!
              </h4>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>
                <Icon className="id outline image" /> 프로필 배경 커스텀마이징
              </Card.Header>
              봇의 프로필 페이지의 배경을 커스터마이징 하세요!
              <div>
                <Segment
                  className="botDetail"
                  textAlign="left"
                  style={{
                    background:
                      'linear-gradient(to right, rgba(34, 36, 38, 0.68), rgba(34, 36, 38, 0.68)), url(/img/iuiu.jpg)',
                    backgroundSize: 'cover'
                  }}
                >
                  <br />
                  <h1 style={{ fontSize: '50px' }}>아이유봇</h1>
                  <Popup
                    content={`해당봇은 공식 디스코드에 부스터가 소유하고 있는봇입니다!`}
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
                  <br />
                  <br />
                  <Label>
                    상태
                    <Label.Detail>
                      <Icon className="circle" color="purple" key="status" />{' '}
                      방송중
                    </Label.Detail>
                  </Label>

                  <Label>
                    접두사
                    <Label.Detail>iu!</Label.Detail>
                  </Label>
                  <Label>
                    라이브러리
                    <Label.Detail>Eris</Label.Detail>
                  </Label>
                  <br />
                  <p style={{ marginTop: '10px', fontSize: '20px' }}>
                    아이유 사진들을 보여주는 봇이에요!
                  </p>
                  <br />
                  <Label.Group tag>
                    카테고리 : <br />
                    <Label as="a" href="#">
                      아이유
                    </Label>
                    <Label as="a" href="#">
                      IU
                    </Label>
                    <Label as="a" href="#">
                      누나 예뻐요
                    </Label>
                  </Label.Group>
                  <br />
                </Segment>
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>
                <Icon className="chain" />
                커스텀 URL
              </Card.Header>
              당신의 봇을 위해 딱맞는 커스텀 URL을 설정하세요!!
              <br />
              <Segment style={{ marginTop: '2em' }}>
                <h4>
                  https://koreanbots.dev/bots/
                  {
                    <span
                      style={{ whiteSpace: 'pre', fontSize: '1.5em' }}
                      ref={el => {
                        this.el = el
                      }}
                    />
                  }
                </h4>
              </Segment>
            </Card.Content>
          </Card>
        </Card.Group>
        <h3>
          부스트 하실 여건이 안되시나요? 그렇다면{' '}
          <a href="https://github.com/koreanbots/verification">봇 인증</a>을
          신청해보세요! 동일 혜택을 받으실 수 있습니다!
        </h3>
        <p style={{ color: 'gray' }}>
          모든 부스트 카운트는 봇별로 적용됩니다. (ex. 부스트 2개를 했다고
          소유한 모든 봇에서 혜택을 적용받을 수 없음)
          <br />
          모든 혜택은 부스트를 유지하실 때만 적용됩니다. (부스트가 해제되면 해당
          혜택들도 이용하실 수 없습니다)
        </p>
        <br />
        <Container textAlign="right">
          <h3>
            도움이 필요하신가요? <a href="/discord">디스코드</a>에서
            도와드리겠습니다!
          </h3>
        </Container>
      </Article>

    )
  }
}

export default Boost
