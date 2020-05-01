import React from "react";
import fetch from "node-fetch";
import "semantic-ui-css/semantic.min.css";

import Bot from "../components/Bot";
import { Grid, Card, Container } from "semantic-ui-react";
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
    const bot = await fetch(config.api + "/bots/search?q=" + q).then(r =>
      r.json()
    );
    console.log(bot);
    this.setState({ bots: bot.code === 200 ? bot.data : [], isLoading: false });
  };

  componentDidMount(props) {
    console.log(this.props.location.search);
    let q = this.props.location.search;
    if (!q) this.setState({ bots: [], isLoading: false });
    this.getData(q.replace(/^\?query=/, ""));
  }
  render() {
    const { bots, isLoading } = this.state;

    console.log(this.props);
    return (
      <Container>
        <br />
        <h1>
          "{decodeURI(this.props.location.search.replace(/^\?query=/, ""))}"에
          관한 검색결과
        </h1>
        <br />
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : bots.length === 0 ? (
          <div className="loader">
            <h1>검색 결과가 없습니다.</h1>
          </div>
        ) : (
          <>
            <Card.Group itemsPerRow={3} stackable>
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
                  category={bot.category}
                />
              ))}
            </Card.Group>
          </>
        )}
      </Container>
    );
  }
}

export default Search;
