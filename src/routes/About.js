import React from 'react'
import withImportantStyle from 'react-with-important-style'
import {
  Container,
  Image,
  Segment,
  Card,
  Icon,
  Divider
} from 'semantic-ui-react'
import { Helmet } from 'react-helmet'
import Article from './Article'

function About(props) {
  const CustomCard = withImportantStyle('div')

  return (
    <Article title="한국 디스코드봇 리스트" subheader="국내봇을 등록하거나, 확인해볼 수 있는 웹사이트입니다." description="자신의 봇을 추가하거나 자신의 서버에 맞는 봇을 찾아보세요.">
      <h2>슬로건</h2>
      <h3>
        <Icon className="left quote" />
        국내봇을 한 곳에서.
        <Icon className="right quote" />
      </h3>
      <Divider />
      <h2>KOREANBOTS 로고</h2>
      <Segment>
        로고를 수정하거나, 변경, 왜곡 등 기타 다른 방법으로 로고를 수정하지
        말아주세요.
        <Image src="./logo.png" />
        <Container textAlign="right">
          <a href="/logo.png" download="koreanbots.png">
            .png
          </a>
        </Container>
        <h3>사용된 폰트</h3>
        <h4>영문: Uni Sans Heavy | 한글: Gugi</h4>
      </Segment>
      <Divider />
      <h2>KOREANBOTS 색상</h2>
      <Card.Group stackabl>
        <CustomCard
          className="ui card"
          style={{
            backgroundColor: '#3366ff !important',
            padding: '15px !important',
            color: 'white'
          }}
        >
          <h2>파랑</h2>
          <br />
          <h3>
            rgb(51, 102, 255)
            <br />
            #3366FF
          </h3>
        </CustomCard>
        <CustomCard
          className="ui card"
          style={{
            backgroundColor: '#1B1C1D !important',
            padding: '15px !important',
            color: 'white'
          }}
        >
          <h2>검정</h2>
          <br />
          <h3>
            rgb(44, 47, 51)
            <br />
            #2C2F33
          </h3>
        </CustomCard>
        <CustomCard
          className="ui card"
          style={{
            backgroundColor: '#21BA45 !important',
            padding: '15px !important',
            color: 'white'
          }}
        >
          <h2>초록</h2>
          <br />
          <h3>
            rgb(33, 186, 69)
            <br />
            #21BA45
          </h3>
        </CustomCard>
        <CustomCard
          className="ui card"
          style={{
            backgroundColor: '#DB2828 !important',
            padding: '15px !important',
            color: 'white'
          }}
        >
          <h2>빨강</h2>
          <br />
          <h3>
            rgb(219, 40, 40)
            <br />
            #DB2828
          </h3>
        </CustomCard>
      </Card.Group>
      <h2>Discord 색상</h2>
      <Card.Group stackable>
        <CustomCard
          className="ui card"
          style={{
            backgroundColor: '#7289da !important',
            minwidth: '100%',
            padding: '15px !important',
            color: 'white'
          }}
        >
          <h2>디스코드 보라</h2>
          <br />
          <h3>
            rgb(114, 137, 218)
            <br />
            #7289DA
          </h3>
        </CustomCard>
        <CustomCard
          className="ui card"
          style={{
            backgroundColor: '#FF73FA !important',
            padding: '15px !important',
            color: 'white'
          }}
        >
          <h2>부스터 분홍</h2>
          <br />
          <h3>
            rgb(255, 115, 250)
            <br />
            #FF73FA
          </h3>
        </CustomCard>
      </Card.Group>
    </Article>
  )
}

export default About
