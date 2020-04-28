import React, { Component } from "react";

export default class GG extends Component {
  render(link) {
    return (
      <div>
        <p>Redirecting to {link}</p>
        <p>
          if it is not working click <a href={link}>Here</a>
        </p>
      </div>
    );
  }
  componentDidMount(link) {
    window.location.assign(link);
  }
}
