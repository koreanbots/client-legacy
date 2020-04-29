import React from "react";
import fetch from "node-fetch"
import Bot from "../components/Bot";
import { Grid } from 'semantic-ui-react'
import config from '../config'

import "./Home.css";
class Home extends React.Component {
  state = {
    isLoading: true,
    bot: {}
  };
  getData = async () => {
    const bot = await fetch(
      config.api + '/bots/get'
    ).then(r=> r.json())
    this.setState({ bot, isLoading: false });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const { isLoading, bot } = this.state;
    return (
      
      
      <section>
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
         
          <div className="bot">
         <Grid stackable centered relaxed columns={5}>
            {bot.data.map(bot => (
              <>
              <Bot
                data={bot}
                key={bot.id}
                id={bot.id}
                name={bot.name}
                avatar={"https://cdn.discordapp.com/avatars/"+bot.id+"/"+bot.avatar+".webp"}
                votes={bot.votes}
                servers={bot.servers}
                category={new Array(bot.category)}
                intro={bot.intro}
                desc={bot.desc}
              />
              </>
            ))}
            
    
            </Grid>
          </div>
        )}
      </section>
    );
  }
}


export default class extends React.Component {

render(){
return (
  <div>
    <br/>

<Home/>
  </div>


)
}
}
