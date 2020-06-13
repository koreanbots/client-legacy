import React from 'react'
import fetch from 'node-fetch'
import { Container } from 'semantic-ui-react'
import Redirect from '../components/Redirect'
import config from '../config'

class Callback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      error: false,
      isLoading: true
    }
  }

  getData = async token => {
    await fetch(config.api + '/oauth/callback?code=' + token)
      .then(r => r.json())
      .then(user => {
        const res = user.data

        if (user.code !== 200 || !res)
          this.setState({ isLoading: false, error: user.message })
        else {
          localStorage.setItem('token', res.token)
          localStorage.setItem('id', res.id)
          localStorage.setItem('date', res.date)
          this.setState({ isLoading: false })
        }
      })
  }

  componentDidMount() {
    var token = this.props.location.search
    token = new URLSearchParams(token.replace('?', '')).get('code')
    this.getData(token)
  }
  render() {
    const { isLoading, error } = this.state
    return (
      <Container>
        {isLoading ? (
          error ? (
            <div className="loader">
              <span>
                데이터 검증에 실패하였습니다. 다시 시도해주세요.
                <br />
                {{ error }}
              </span>
            </div>
          ) : (
            <div className="loader">
              <span>데이터 검증중...</span>
            </div>
          )
        ) : (
          <Redirect to="/" />
        )}
      </Container>
    )
  }
}

export default Callback
