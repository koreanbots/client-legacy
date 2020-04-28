import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import Search from "./Search";
import Config from "../config";
import axios from "axios";
import config from "../config";
export default class MenuExampleStackable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {}
    };
  }

  componentDidMount() {
    const getUser = async (token, id, date) => {

      axios({
        method: "POST",
        url: config.api + "/users/login",
        headers: { token, id, time: date }
      })
        .then(r => {
          this.setState({ user: r.data.user, isLoading: false });
        })
        .catch(err => console.log(err));
    };
    getUser(this.props.token, this.props.id, this.props.date);
  }

  render() {
    console.log(this.state);
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
          {this.state.isLoading ? (
            <Menu.Item color="black" name="로그인" href={Config.url}>
              로그인
            </Menu.Item>
          ) : (
            <Menu.Item name="로그인" href={Config.url}>
              <div>
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
                <span>
                  {" "}
                  {this.state.user.username}#{this.state.user.tag}
                </span>
              </div>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}
