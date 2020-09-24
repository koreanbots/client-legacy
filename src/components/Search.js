import React, { Component } from 'react'
import { Image, Search, Icon } from 'semantic-ui-react'
import './Search.css'
import graphql from '../utils/graphql'
import Countdown from './Countdown'
import { Link } from 'react-router-dom'
export default class SearchField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || '',
      result: [ ],
      redirect: false,
      ratelimit: 0,
      error: null
    }
  }

  async preview(value) {
    value = decodeURIComponent(value)
    if(+this.state.ratelimit > +new Date()) return
    if(value.length < 2) return this.setState({ result : [], error: '' })
    const query = `query {
      search( query: "${value.replace(/\\/gi, '\\\\').replace(/"/g, '\\"')}", limit: 10) {
        id
        name
        avatar
        votes
        tag
        servers
        category
        intro
        verified
        trusted
        vanity
      }
    }
    `
    const res = await graphql(query)
    if(!res.data || res.errors) return this.setState({ result: [], error: res.message })
    if(res.code === 429) return this.setState({ ratelimit: new Date(+new Date() + res.try_after * 1000), error: '' })
     
    
    if(res.code === 200) this.setState({ error: '', result: res.data.search.map(el=> {
      el.idx = el.id
      return el
    })})

  }
  render() {
    const to = r => {
      window.location.href = '/search?query=' + encodeURIComponent(r) + '&page=1'
      return ''
    }
    return (
      <div className="search">
        <Search
          className={`${this.props.large ? 'gg box' : 'box'}${this.props.fluid ? ' fluid' : ''}${this.props.massive ? ' tall' : ''}`}
          onKeyDown={this.handleSubmit.bind(this)}
          onSearchChange={this.handleChange.bind(this)}
          icon="search"
          placeholder="검색..."
          style={this.props.style}
          value={this.state.value}
          results={this.state.result}
          fluid={this.props.fluid}
          resultRenderer={resultRenderer}
          noResultsMessage={+this.state.ratelimit > +new Date() ? '지정된 시간에 너무 많은 요청을 보냈습니다.' : this.state.error ? this.state.error : this.state.value.length < 2 ? '2글자 이상 입력해주세요.'  : '검색결과가 없습니다.'}
          noResultsDescription={+this.state.ratelimit > +new Date() ? (<>dfsat<Countdown after={()=> this.preview(this.state.value)} time={Math.round((this.state.ratelimit - new Date())/1000)} />초 후에 다시 시도해주세요.</>) : ''}
        />

        {this.state.redirect ? to(this.state.value) : ''}
      </div>
    )
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    })

    this.preview(event.target.value)
  }
  handleSubmit(e) {
    if (e.key === 'Enter') {
      this.setState({ redirect: true })
    }
  }
}


const resultRenderer = ({ idx, name, avatar, tag, intro, votes, trusted, boosted, vanity }) => {
  return (
    <Link to={`/bots/${(trusted || boosted) && vanity ? vanity : idx}`} className="results">
      <Image style={{ height: '3em', width: '3em' }} src={avatar
        ? 'https://cdn.discordapp.com/avatars/' +
          idx +
          '/' +
          avatar +
          '.png?size=128'
        : `https://cdn.discordapp.com/embed/avatars/${tag %
            5}.png?size=128`
    } />
    <div className="content">
      <div className="price"><a style={{ color: 'red' }}>{votes} <Icon className="heart" /></a></div>
      <div className="title">{name}</div>
      <div className="description">{intro}</div>
    </div>
    </Link>
  )
}
