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
      config.api + '/bots/get/' + id
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

    console.log(bot)
    return (
      <Container>
        <br/>
      <Grid divided='vertically'>
        { isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <Grid.Row columns={2}>
              <Grid.Column>
              <Image src={"https://cdn.discordapp.com/avatars/"+bot.id+"/"+bot.avatar+".webp"} size='medium' rounded />
            </Grid.Column>
            <Grid.Column>
        <br/>
        <h1 style={{'font-size':'50px'}}>{bot.name}</h1>
        <Label>
          상태
        <Label.Detail><Label circular color={status[bot.status]} empty key='status' /></Label.Detail>
        </Label>

        <Label>
          접두사
        <Label.Detail>{bot.prefix}</Label.Detail>
        </Label>
        <Label>
          라이브러리
        <Label.Detail>{bot.lib}</Label.Detail>
        </Label>
        <br />
        <p style={{"margin-top" : "10px", "font-size" : "20px"}}>
          {bot.intro}
        </p>
        <br/>
        <Label.Group tag>
          카테고리 :  <br/>
        {bot.category.length == 0 ? (
          ' 지정되지 않음'
        ):(
          bot.category.map(c => (
          <Label as='a'>{c}</Label>
          ))
        )}
        </Label.Group>
        <br />
          {
            bot.url == "false" ? (
              <Button className="discord" content='초대하기' labelPosition='left' icon='discord' href={`https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0`}></Button>
            ) : 
            <Button className="discord" content='초대하기' labelPosition='left' icon='discord' href={bot.url}></Button>
          }
          {
            bot.web == "false" ? (
              ''
            ) : 
            <Button color="blue" content='초대하기' labelPosition='left' icon='globe' href={bot.web}></Button>
          }
          
          {
            bot.git == "false" ? (
              ''
            ) : 
            <Button color="black" content='Git' labelPosition='left' icon='git' href={bot.github}></Button>
          }
            </Grid.Column>
          </Grid.Row>
        )}
     </Grid>
     <Grid.Row columns={5}> 
       <Grid.Column>
       <Button className="discord" content={bot.servers==0? 'N/A' : bot.servers + ' 서버'} ></Button>
        <Button content={bot.votes} color='red' icon='heart' labelPosition='right' />
       </Grid.Column>
       <Grid.Column>
         <br/>
        <div>
          제작자 : 
        <img src={"https://cdn.discordapp.com/avatars/"+bot.id+"/"+bot.avatar+".webp"} class="ui avatar image" />
        <span>Username#Tag</span>
        </div>
       </Grid.Column>
     </Grid.Row>
     
     <Divider section />
     <p>
       {bot.desc}
     </p>
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