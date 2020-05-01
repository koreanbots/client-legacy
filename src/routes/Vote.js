import React from "react";
import fetch from "node-fetch";
import {
  Image,
  Grid,
  Container,
  Label,
  Divider,
  Button,
  Icon
} from "semantic-ui-react";
import ReactMarkdown from "react-markdown/with-html";
import config from "../config";

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      isLoading: true,
      bot: {}
    };
  }

  getData = async id => {
    await fetch(config.api + "/bots/vote/" + id, {
      method: "GET",
      headers: {
        token: localStorage.token,
        id: localStorage.id,
        time: localStorage.date
      }
    })
      .then(r => r.json())
      .then(bot =>
        this.setState({
          bot: bot.code === 200 ? bot.data : false,
          isLoading: false
        })
      );
  };

  componentDidMount(props) {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.getData(id);
  }
  render() {
    return <div></div>;
  }
}

export default Vote;
