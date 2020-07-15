import React, { Component } from "react";
import { render } from "react-dom";
import Example from "./counter";
import "./style.css";

class App extends Component {
  render() {
    return <Example />;
  }
}

render(<App />, document.getElementById("root"));
