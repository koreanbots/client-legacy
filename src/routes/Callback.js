import React from 'react'
import fetch from 'node-fetch'
import { Container } from 'semantic-ui-react'
import Redirect from '../components/Redirect'
import config from '../config'
import graphql from '../utils/graphql'

class Callback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      error: false,
      isLoading: true,
      redirect: null
    }
  }

  getData = async (code) => {
    await graphql(`mutation {
      login(code: "${code}")
    }
    `)
      .then(res=> {
        if(res.code !== 200) this.setState({ isLoading: false, error: res.message })
        else {
          localStorage.setItem('token', res.data.login)
          this.setState({ isLoading: false })
        } 
      })
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search.replace('?', ''))
    const code = query.get('code')
    this.getData(code)
  }
  render() {
    const { isLoading, error } = this.state
    return (
      <Container>
        {isLoading ? (
          error ? (
            <div className="loader">
              <span>
                데이터 검증에 실패하였습니다. 다시 시도해주세요. (새로고침하시거나 다시 로그인해주세요.)
                <br />
                {{ error }}
              </span>
            </div>
          ) : (
            <div className="loader">
              <span>데이터 검증중...</span>
            </div>
          )
        ) : window.history.go(-2) || window.location.assign('/') }
      </Container>
    )
  }
}

export default Callback
