import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styles from "./App.module.css";
import { fetchData } from "./api";
import {
  Cards,
  Header,
  SignUp,
  LogIn,
  Settings,
  MessageToast,
} from "./components";
import { getFromStorage } from "./util/storage";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { themeFile } from "./util/theme";

const theme = createMuiTheme(themeFile);

export class App extends Component {
  state = {
    data: {},
    isLoggedIn: false,
    userData: {},
    open: false,
  };

  async componentDidMount() {
    // Check if there is a new_user token generated in signup page
    const newUser = sessionStorage;
    const key = Object.keys(newUser)[0];

    const userObj = {};
    userObj.username = newUser.username;

    if (newUser.length === 2 && key === "new_user") {
      this.setState({
        isLoggedIn: true,
        userData: userObj,
      });
    }

    // Check if the token is correct when logging in second time or later
    try {
      const obj = getFromStorage("the_main_app");
      if (obj && obj.token) {
        const { token, userData } = obj;
        console.log(obj, "obj");

        const response = await fetch(`/api/users/verify?token=${token}`);
        const status = await response.json();

        if (status.success) {
          this.setState({
            isLoggedIn: true,
            userData,
          });
        } else {
          this.setState({
            isLoggedIn: false,
          });
        }

        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async logout(e) {
    const newUser = sessionStorage;
    const key = Object.keys(newUser)[0];
    if (newUser.length === 2 && key === "new_user") {
      this.setState({
        isLoggedIn: false,
      });
      sessionStorage.removeItem("new_user");
      window.location.pathname = "/login";
    }

    const obj = getFromStorage("the_main_app");
    console.log("logout");
    if (obj && obj.token) {
      const { token } = obj;
      const response = await fetch(`/api/users/logout?token=${token}`);
      const status = await response.json();
      if (status.success) {
        this.setState({
          isLoggedIn: false,
          open: true,
        });
        localStorage.removeItem("the_main_app");

        setTimeout(() => {
          window.location.pathname = "/login";
        }, 1000);
      } else {
        this.setState({
          isLoggedIn: false,
        });
      }
    }
  }
  render() {
    const { data, isLoggedIn, userData, open } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.container}>
          <Router>
            <Header
              loginStatus={isLoggedIn}
              token={userData}
              logoutAction={(e) => this.logout(e)}
            />
            <Route exact path="/" render={() => <Cards data={data} />} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route
              path="/settings"
              render={() => <Settings token={userData} />}
            />
          </Router>
          <MessageToast
            open={open}
            severity="success"
            message="See you next time!"
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
