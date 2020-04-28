import React from "react";
import axios from "axios";
import {
  Image,
  Grid,
  Container,
  Label,
  Divider,
  Button
} from "semantic-ui-react";
import config from "../config";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      isLoading: true
    };
  }

  getData = async token => {
    console.log(config.api + "/oauth/callback?code=" + token);
    axios
      .get(config.api + "/oauth/callback?code=" + token)
      .then(user => {
        console.log(user)
        const res = user.data.data
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.id);
        localStorage.setItem("date", res.date)
        this.setState({ isLoading: false });
         
        });
      }


  componentDidMount(props) {
    var token = this.props.location.search;
    token = new URLSearchParams(token.replace("?", "")).get("code");
    this.getData(token);
  }
  render() {
    const { bot, isLoading } = this.state;

    console.log(bot);
    return <Container></Container>;
  }
}

export default Detail;
