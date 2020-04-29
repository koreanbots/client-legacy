import React from "react";
import fetch from "node-fetch"
import "semantic-ui-css/semantic.min.css";

import Bot from "../components/Bot";
import {
  Grid
} from "semantic-ui-react";
import config from "../config";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      isLoading: true,
      bots: {}
    };
  }

  getData = async q => {
    const bot = await fetch(config.api + "/bots/search?q=" + q);
    this.setState({ bots: bot.data.data, isLoading: false });
  };

  componentDidMount(props) {
    this.getData(this.props.location.search.replace(/^\?query=/, ''));
  }
  render() {
    const { bots, isLoading } = this.state;

    console.log(this.props);
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : bots.length === 0 ? (
          <div className="loader">
            <h2>검색 결과가 없습니다.</h2>
          </div>
        ) : (
          <div className="bot">
            <Grid stackable centered columns={2}>
              <Grid.Row>
                {bots.map(bot => (
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

export default Search;
