import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { Cards, Header, SignUp, LogIn } from "./components";
import { getFromStorage } from "./util/storage";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { themeFile } from "./util/theme";

const theme = createMuiTheme(themeFile);

export class App extends Component {
  state = {
    data: {},
    isLoggedIn: false,
  };

  async componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      const response = await fetch(`/api/users/verify?token=${token}`);
      const status = await response.json();
      if (status.success) {
        this.setState({
          isLoggedIn: true,
        });
      } else {
        this.setState({
          isLoggedIn: false,
        });
      }
    }

    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  render() {
    const { data, isLoggedIn } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.container}>
          <Router>
            <Header loginStatus={isLoggedIn} />
            <Route exact path="/" render={() => <Cards data={data} />} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
