import React from 'react'
import { Container, Icon } from 'semantic-ui-react'
import Logo from '../components/Logo'
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
    `, true)
      .then(res=> {
        if(res.code !== 200) this.setState({ isLoading: false, error: res.message })
        else {
          localStorage.setItem('token', res.data.login)
          this.setState({ isLoading: false })
          this.redirect()
        } 
      })
  }

  redirect = () => {
    localStorage.redirect ? window.location.assign(localStorage.redirect) : window.location.assign('/')
    delete localStorage.redirect
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search.replace('?', ''))
    const code = query.get('code')
    this.getData(code)
  }
  render() {
    const { isLoading, error } = this.state
    return (
      <div className="loader">
             <Container textAlign="center">
            <Logo /> <Icon className="plus" /> <h1 style={{ marginTop: '14px' }}><Icon className="discord" /></h1>
            <br/>
            <h3>{ isLoading ? '데이터 검증중입니다.' : error ? '오류가 발생하였습니다. (다시 시도해주세요.)' : '성공적으로 로그인하였습니다. 리다이렉트합니다.'}</h3>
            </Container>
        </div>
    )
  }
}

export default Callback