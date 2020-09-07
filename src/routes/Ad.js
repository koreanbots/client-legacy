import React from 'react'
import { Helmet } from 'react-helmet'
import { Container } from 'semantic-ui-react'
import Article from './Article'

class Ad extends React.Component {
  render() {
    return (
      <Article title="광고" description="광고주분들을 찾고 있습니다.">
        <p>한국 디스코드봇 리스트는 광고주분을 모집합니다.<br/>저희 웹사이트에 광고를 추가하고 싶으시다면 문의해주세요.</p>
        <p>문의: wonderlandpark#9999</p>
      </Article>
    )
  }
}

export default Ad
