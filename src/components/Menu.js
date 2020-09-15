import React, { Component } from 'react'
import {
  Menu,
  Image,
  Responsive,
  Icon,
  Sidebar,
  Dropdown
} from 'semantic-ui-react'
import Search from './Search'
import config from '../config'

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
    const getUser = async (token, id, date) => {
      await fetch(config.api + '/users/@me', {
        method: 'GET',
        headers: { token, id, time: date }
      })
        .then(r => r.json())
        .then(r => {
          if (r.code === 200) {
            localStorage.setItem('userCache', JSON.stringify(r.user))
            this.setState({
              user: JSON.parse(localStorage.userCache),
              isLoading: false,
              logged: 1
            })
          } else {
            localStorage.setItem('userCache', false)
            this.setState({
              user: JSON.parse(localStorage.userCache),
              isLoading: false,
              logged: 0
            })
          }
        })
        .catch(err => console.log(err))
    }
    if (!localStorage.userCache || !JSON.parse(localStorage.userCache))
      getUser(this.props.token, this.props.id, this.props.date)
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
                      this.state.user.avatar !== false
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
            <Menu.Item as="a" href="/discord">
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
              <Menu.Item name="discord" href="https://discord.gg/JEh53MQ">
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
                    this.state.user.avatar !== false ? (
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
        </Responsive>
      </>
    )
  }
}
