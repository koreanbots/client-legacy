import React, { Component } from "react";
import "./404.css";

export default class MenuExampleStackable extends Component {
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
  };
  draw = p5 => {
    p5.background(20);
    p5.noStroke();
    for (let i = 0; i < 800; i++) {
      p5.ellipse(
        Math.floor(Math.random() * window.innerWidth) + 1,
        Math.floor(Math.random() * window.innerHeight) + 1,
        4,
        8
      );
    }
    // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
    this.x++;
  };
  render() {
    return (
      <div className="notfound">
        <h2>Oops! Page not found.</h2>
        <br />
        <h1>404</h1>
      </div>
    );
  }
}
