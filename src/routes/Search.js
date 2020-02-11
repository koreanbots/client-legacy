import React from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import { Image, Grid, Container, Label, Divider, Button } from 'semantic-ui-react'
import config from '../config'

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      isLoading: true,
      bot: {}
    };
  }


  getData = async (id) => {
    const bot = await axios.get(
        config.api + '/bots/get/' +id
    )
    this.setState({ bot : bot.data.data[0], isLoading: false });
  };

 
  componentDidMount(props) {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    this.getData(id);
  }
  render() {
    const { bot, isLoading } = this.state;

    console.log(this.props)
    return (
      <Container>
       
     </Container>
    );
        }
}




export default Detail


const status = {
  online : 'green',
  idle : 'yellow',
  dnd : 'red',
  offline : 'gray',
  streaming : 'purple'
}