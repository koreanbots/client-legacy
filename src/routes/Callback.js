import React from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import { Image, Grid, Container, Label, Divider, Button } from 'semantic-ui-react'
import config from "../config"

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      isLoading: true,
      user: {}
    };
  }


  getData = async (token) => {
    console.log(config.api+ '/oauth/callback?code=' + token)
    axios.get(config.api+ '/oauth/callback?code=' + token) 
    .then(user=>{
        this.setState({ user : user.data.user, isLoading: false });
        console.log(this.state.user)
        axios.get(config.api+user.data.user.id)
        .then(async res=>{
            if(res.data.code == 200){
                console.log(res.data.data)
                await localStorage.setItem(
                    "token" , res.data.data[0].token
                )
                this.props.history.push('/')
            }
            else {
                axios.post(config.api + '/users/create/' + token, {headers : {tag : user.data.user.tag, username : user.data.user.username, avatar : user.data.user.avatar}})
                .then(async newUser=>{
                  await localStorage.setItem(
                    "token", newUser.data.data.token
                  )
                  this.props.history.push('/')
                })
            }
        })
    })
    .catch(e=>console.log(e))

  };

 
  componentDidMount(props) {
    var token = this.props.location.search
    token = new URLSearchParams(token.replace('?', '')).get('code')
    this.getData(token);
  }
  render() {
    const { bot, isLoading } = this.state;

    console.log(bot)
    return (
      <Container>
      
     </Container>
    );
        }
}




export default Detail

