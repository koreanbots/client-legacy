import React, { Component } from "react";
import { Input, Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import config from "../config";
export default class SearchExampleStandard extends Component {
    constructor(props){
        super(props)
        console.log(this.props)

  this.state = {
    value: "",
    result: {},
    redirect: false
  }
}
  render() {
    return (
      <div className="search">
        <Input
          className="box"
          onKeyDown={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
          icon="search"
          placeholder="검색..."
        />
        
        {this.state.redirect ? (
          this.props.location.href = "/search?query=" + this.state.value
        ) : (
          ""
        )}
      </div>
    );
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit(e) {
    if (e.key === "Enter") {
      this.setState({ redirect: true });
    }
  }
}
