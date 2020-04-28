import React from "react";
import axios from "axios";
import Bot from "../components/Bot";
import Search from "../components/Search";
import { Grid } from "semantic-ui-react";
import config from "../config";

import "./Home.css";
class Home extends React.Component {
  state = {
    isLoading: true,
    bot: {}
  };
  getData = async () => {
    const bot = await axios.get(config.api + "/bots/get");
    this.setState({ bot, isLoading: false });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const { isLoading, bot } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="bot">
            <Grid stackable centered columns={2}>
              <Grid.Row>
                {bot.data.data.map(bot => (
                  <Bot
                    data={bot}
                    key={bot.id}
                    id={bot.id}
                    name={bot.name}
                    avatar={
                      "https://cdn.discordapp.com/avatars/" +
                      bot.id +
                      "/" +
                      bot.avatar +
                      ".webp"
                    }
                    votes={bot.votes}
                    servers={bot.servers}
                    category={new Array(bot.category)}
                    intro={bot.intro}
                    desc={bot.desc}
                  />
                ))}
              </Grid.Row>
            </Grid>
          </div>
        )}
      </section>
    );
  }
}

export default class extends React.Component {
  render() {
    return (
      <div>
        <br />

        <Home />
      </div>
    );
  }
}
