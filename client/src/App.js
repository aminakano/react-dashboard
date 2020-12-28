import React, { Component } from 'react';
import styles from "./App.module.css";
import { fetchData } from "./api";
import { Cards } from "./components";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { themeFile } from "./util/theme";

import img from "./images/icon.png";

const theme = createMuiTheme(themeFile);

export class App extends Component {
  state = {
    data: {},
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  render() {
    const { data } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.container}>
          <img src={img} alt="Diamond" />
          <Cards data={data}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App
