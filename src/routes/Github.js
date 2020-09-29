import React from 'react'
import { Container, Icon } from 'semantic-ui-react'
import Logo from '../components/Logo'
import graphql from '../utils/graphql'

class GithubCallback extends React.Component {
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
      github(code: "${code}")
    }
    `, true)
      .then(res=> {
        if(res.code !== 200) this.setState({ isLoading: false, error: res.message })
        else {
          this.setState({ isLoading: false, result: res.data.github })
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
     
        <div className="loader">
             <Container textAlign="center">
            <Logo /> <Icon className="plus" /> <h1 style={{ marginTop: '14px' }}><Icon className="github" /></h1>
            <br/>
            <h2>{ isLoading ? '계정을 연동중입니다.' : error ? '오류가 발생하였습니다.' : '깃허브 계정을 성공적으로 연동하였습니다.'}</h2>
            </Container>
        </div>
    )
  }
}

export default GithubCallback
