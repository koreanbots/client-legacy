import React, { Component } from 'react'
import {Input, Grid} from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
import "./Search.css"
export default class SearchExampleStandard extends Component {
    state = {
        value: "",
        redirect: false
    }
    render() {  
        
      return (
         
    <div className="search">
          <Input className="box" size='' onKeyDown={this.handleSubmit.bind(this)} onChange={this.handleChange.bind(this)} icon='search' placeholder='검색...'/>
  
              {this.state.redirect ? (
                   <Redirect to={"/search?q="+this.state.value}></Redirect>
              ) : (
                  ''
              ) }
          </div>
    )
     
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
          });
    }
    handleSubmit(e) {
        if (e.key === 'Enter') {
            console.log('g')
            this.setState({redirect : true})
        }
    }
  }