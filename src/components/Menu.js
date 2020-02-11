import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link, Redirect } from "react-router-dom";
import Search from "./Search"
import Config from "../config"
import axios from 'axios'
export default class MenuExampleStackable extends Component {
      constructor(props){
        super(props)
        console.log(this.props.token)
        const token = this.props.token
        this.state = {
          isLoading : true,
          user : {}
        }
      }


      componentDidMount(){
        const getUser = async(token) => {
          axios({method : 'GET', url:'http://localhost:4000/users/login', headers : {token : token}})
          .then(r=>{
          this.setState({user : r.data.user, isLoading : false})
          })
          .catch(err=>console.log(err))
        }
        getUser(this.props.token)
      }
     
      render() {
        console.log(this.state)
      return (
        <Menu stackable>
          <Menu.Item>
            <img src='/logo.png' alt="logo"/>
          </Menu.Item>
  
          <Menu.Item
            name='홈'
            href="/"
            >
            홈
          </Menu.Item>
  
          <Menu.Item
            name='디스코드'
            href="https://discord.gg/JEh53MQ"
          >
            디스코드
          </Menu.Item>
        
        
          <Menu.Menu position='right'>
          
            <Menu.Item>
            <Search/>
            </Menu.Item>
            {
              this.state.isLoading ? (
                <Menu.Item
                icon='discord'
                color='black'
                name='로그인'
                href={Config.url}
              >
                로그인d
              </Menu.Item>
              )
              :
              (
                <Menu.Item
                icon='discord'
                name='로그인'
                href={Config.url}
              >

                <div>
                  <Image src={"https://cdn.discordapp.com/avatars/"+this.state.user.id+"/"+this.state.user.avatar+".webp"} avatar />
                  <span> {this.state.user.username}#{this.state.user.tag}</span>
                </div>

               
              </Menu.Item>
              )
            }
          </Menu.Menu>
        </Menu>
      )
    }
  }
  
 