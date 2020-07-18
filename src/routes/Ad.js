import React from 'react'
import { Helmet } from 'react-helmet'
import { Container } from 'semantic-ui-react'

class Ad extends React.Component {
  render() {
    return (
      <Container>
        <Helmet>
          <title>광고 - 한국 디스코드봇 리스트</title>
          <meta
            name="description"
            content="국내 디스코드봇들을 확인하고, 초대해보세요!"
          />
        </Helmet>
        <h1>광고</h1>
        <p>한국 디스코드봇 리스트는 광고주분을 모집합니다.<br/>저희 웹사이트에 광고를 추가하고 싶으시다면 문의해주세요.</p>
        <p>문의: wonderlandpark#9999</p>
 
      </Container>
    )
  }
}

export default Ad
