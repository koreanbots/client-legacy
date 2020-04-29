import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
import Search from "./Search";
import Config from "../config";
import fetch from "node-fetch";
import config from "../config";


export default class MenuExampleStackable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {},
      logged: 2
    };
  }

  componentDidMount() {
    const getUser = async (token, id, date) => {

      await fetch(config.api + "/users/@me", {
        method: 'POST',
        headers: { token, id, time: date }
      })
        .then(r =>
          r.json()
        )
        .then(r=> {
          if(r.code === 200) {
            localStorage.setItem('userCache', JSON.stringify(r.user))
            this.setState({ user: JSON.parse(localStorage.userCache), isLoading: false, logged: 1});}
          else {
            localStorage.setItem('userCache', false)
            this.setState({ user: JSON.parse(localStorage.userCache), isLoading: false, logged: 0 });
          }
          
        })
        .catch(err => console.log(err));
    };
    if(!localStorage.userCache || !JSON.parse(localStorage.userCache)) getUser(this.props.token, this.props.id, this.props.date);
    else this.setState({ user: JSON.parse(localStorage.userCache), isLoading: false, logged: 1 })
  }

  render() {
    return (
      <Menu stackable>
        <Menu.Item href="/">
          <h1 style={{ fontFamily: "Gugi" }}>디코봇</h1>
        </Menu.Item>
        <Menu.Item name="디스코드" href="https://discord.gg/JEh53MQ">
          디스코드
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Search />
          </Menu.Item>
          {this.state.logged === 0 ? (
            <Menu.Item color="black" name="로그인" href={Config.url}>
              로그인
            </Menu.Item>
          ) : this.state.logged === 1 ? (
            <Menu.Item name="로그인" href="/logout">
              <div>
                {
                  this.state.user.avatar !== 'none' ? (
                    <Image
                  src={
                    "https://cdn.discordapp.com/avatars/" +
                    this.state.user.id +
                    "/" +
                    this.state.user.avatar +
                    ".webp"
                  }
                  avatar
                />
                  ) : (
                    <Image
                  src={`https://cdn.discordapp.com/embed/avatars/${this.state.user.tag % 5}.png`}
                  avatar
                />
                  )
                }
                <span>
                  {" "}
                  {this.state.user.username}#{this.state.user.tag}
                </span>
              </div>
            </Menu.Item>
          ) : (
            <></>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}
