import React, { Component } from 'react';
import styles from "./App.module.css";
import img from "./images/icon.png";

export class App extends Component {
  render() {
    return (
      <div>
        <img src={img} alt="Diamond" />
        <h1>Hello World!</h1>
      </div>
    )
  }
}

export default App
