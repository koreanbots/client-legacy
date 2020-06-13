import React from 'react'
import { Container } from 'semantic-ui-react'
import Redirect from '../components/Redirect'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      done: false,
      error: false
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.userCache)
    if (!user || user.id === this.props.match.params.id) {
      delete localStorage.userCache
      delete localStorage.token
      delete localStorage.date
      delete localStorage.id
      this.setState({ done: true })
    } else {
      this.setState({ error: true })
    }
  }
  render() {
    const { done, error } = this.state
    return (
      <Container>
        {done && !error ? (
          <Redirect to="/" />
        ) : error ? (
          <div className="loader">
            CSRF 방지 검증 아이디 인증에 실패하였습니다.
          </div>
        ) : (
          <div className="loader">
            <span>로그아웃중...</span>
          </div>
        )}
      </Container>
    )
  }
}

export default Detail
