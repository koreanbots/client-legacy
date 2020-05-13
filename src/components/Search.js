import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import './Search.css';
export default class SearchExampleStandard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      result: {},
      redirect: false
    };
  }
  render(props) {
    const to = r => {
      window.location.href = '/search?query=' + r;
      return '';
    };
    return (
      <div className="search">
        <Input
          className="box"
          onKeyDown={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
          icon="search"
          placeholder="검색..."
          fluid={this.props.fluid}
        />

        {this.state.redirect ? to(this.state.value) : ''}
      </div>
    );
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit(e) {
    if (e.key === 'Enter') {
      this.setState({ redirect: true });
    }
  }
}
