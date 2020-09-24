import React, { Component } from 'react'
import {
  Menu,
  Image,
  Responsive,
  Icon,
  Sidebar,
  Dropdown, Container
} from 'semantic-ui-react'
import Search from './Search'
import config from '../config'
import graphql from '../utils/graphql'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      user: {},
      logged: 2,
      visible: false
    }
  }

  componentDidMount() {
    if(!localStorage.token) return
    const getUser = async () => {
      await graphql(`query {
        me {
          id
          avatar
          tag
          username
          perm
        }
      }`)
        .then(r => {
          if (r.code !== 200) {
            delete localStorage.userCache
            this.setState({
              user: JSON.parse(localStorage.userCache),
              isLoading: false,
              logged: 0
            })
          } else {
            localStorage.setItem('userCache', JSON.stringify(r.data.me))
            this.setState({
              user: JSON.parse(localStorage.userCache),
              isLoading: false,
              logged: 1
            })

          }
        })
        .catch(err => console.log(err))
    }
    if (!localStorage.userCache && localStorage.token) getUser(this.props.token)
    else
      this.setState({
        user: JSON.parse(localStorage.userCache),
        isLoading: false,
        logged: 1
      })
  }
  editSlider = () => {
    this.setState({ visible: !this.state.visible })
  }

  logout = () => {
    delete localStorage.userCache
    delete localStorage.token
    window.location.assign('/')
  }
  render() {
    const { visible } = this.state
    return (
      <>
        <Responsive {...Responsive.onlyMobile}>
          <Menu
            className="nav"
            pointing
            widths={3}
            inverted={this.props.Darkmode}
          >
            <Menu.Item onClick={this.editSlider}>
              <Icon className="large bars" />
            </Menu.Item>
            <Menu.Item href="/">
              <h1
                style={{ fontFamily: 'Uni Sans Heavy CAPS', fontSize: '18px' }}
              >
                KOREANBOTS
              </h1>
            </Menu.Item>
            {this.state.logged === 0 ? (
              <Menu.Item color="black" name="로그인" href={config.url}>
                로그인
              </Menu.Item>
            ) : this.state.logged === 1 ? (
              <Dropdown
                item
                trigger={
                  <Image
                    src={
                      this.state.user.avatar
                        ? 'https://cdn.discordapp.com/avatars/' +
                          this.state.user.id +
                          '/' +
                          this.state.user.avatar +
                          '.png'
                        : `https://cdn.discordapp.com/embed/avatars/${this.state
                            .user.tag % 5}.png`
                    }
                    avatar
                  />
                }
              >
                <Dropdown.Menu direction="left">
                  <Dropdown.Header
                    content={
                      this.state.user.username + '#' + this.state.user.tag
                    }
                  />
                  <Dropdown.Item href="/profile">
                    <Icon className="settings" /> 관리패널
                  </Dropdown.Item>
                  <Dropdown.Item onClick={this.logout}>
                    <a style={{ color: '#ff6e6e' }}>
                      <Icon className="logout" /> 로그아웃
                    </a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Menu.Item color="black" name="로그인" href={config.url}>
                로그인
              </Menu.Item>
            )}
          </Menu>
          <Sidebar
            as={Menu}
            animation="overlay"
            direction="top"
            vertical
            className="nav sidebar"
            visible={visible}
          >
            <Menu.Item position="right" onClick={this.editSlider}>
              <Icon className="close" />
              <br />
            </Menu.Item>
            <Menu.Item href="/discord">
              디스코드
            </Menu.Item>
            <Menu.Item name="about" href="/about">
              소개
            </Menu.Item>
            <Menu.Item name="api" href="/api">
              API
            </Menu.Item>
            <Menu.Item name="add" href="/addbot">
              봇 추가하기
            </Menu.Item>
            <Menu.Item>
              <Search fluid />
            </Menu.Item>
          </Sidebar>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Container textAlign="center">
          <Menu
            className="nav"
            secondary
            inverted={this.props.Darkmode}
            style={{ background: 'transpert' }}
          >
            <Menu.Menu>
              <Menu.Item href="/">
                <h1 style={{ fontFamily: 'Uni Sans Heavy CAPS' }}>
                  KOREANBOTS
                </h1>
              </Menu.Item>
              <Menu.Item as={Link} href="/discord">
                디스코드
              </Menu.Item>
              <Menu.Item name="about" as={Link} to="/about">
                소개
              </Menu.Item>
              <Menu.Item name="api" as={Link} to="/api">
                API
              </Menu.Item>
              <Menu.Item name="add" as={Link} to="/addbot">
                봇 추가하기
              </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Menu.Item>
              </Menu.Item>
              {this.state.logged === 0 ? (
                <Menu.Item color="black" name="로그인" href={config.url}>
                  로그인
                </Menu.Item>
              ) : this.state.logged === 1 ? (
                <Dropdown
                  item
                  trigger={
                    this.state.user.avatar ? (
                      <>
                        <Image
                          src={
                            'https://cdn.discordapp.com/avatars/' +
                            this.state.user.id +
                            '/' +
                            this.state.user.avatar +
                            '.png'
                          }
                          avatar
                        />
                        <span>
                          {' '}
                          {this.state.user.username}#{this.state.user.tag}
                        </span>
                      </>
                    ) : (
                      <>
                        <Image
                          src={`https://cdn.discordapp.com/embed/avatars/${this
                            .state.user.tag % 5}.png`}
                          avatar
                        />
                        <span>
                          {' '}
                          {this.state.user.username}#{this.state.user.tag}
                        </span>
                      </>
                    )
                  }
                >
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">
                      <Icon className="settings" /> 관리패널
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.logout}>
                      <a style={{ color: '#ff6e6e' }}>
                        <Icon className="logout" /> 로그아웃
                      </a>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Menu.Item color="black" name="로그인" href={config.url}>
                  로그인
                </Menu.Item>
              )}
            </Menu.Menu>
          </Menu>
          </Container>
        </Responsive>
      </>
    )
  }
}
