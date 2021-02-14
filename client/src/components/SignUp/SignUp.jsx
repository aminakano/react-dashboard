import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { TextField, Button, CircularProgress, Grid, Typography, Paper, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import styles from "./SignUp.module.css";

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      errors: {},
      loading: false,
      open: false
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    this.setState({
      loading: true,
    });

    try {
      const newUserData = {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        username: this.state.username,
      };

      const params = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData)
      }
      const response = await fetch("/api/users/signup", params);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const json = await response.json();
        console.log(`json: ${JSON.stringify(json)}`);
        if(json.success) {
          // Generate a random number for a session token
          const sessionToken = window.crypto.getRandomValues(new Uint32Array(1))

          sessionStorage.setItem("new_user", sessionToken[0]);
          sessionStorage.setItem("username", newUserData.username);

          this.setState({
            open: true
          })

          setTimeout(() => { window.location = "/" }, 1000);

        } else {
          this.setState({
            errors: json.message,
            loading: false,
          })
        }
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    const { errors, loading, open, username } = this.state;
    return (
      <div>
        <Snackbar open={open} autoHideDuration={6000}>
          <MuiAlert severity="success">
            {`Welcome ${username}!`}
          </MuiAlert>
        </Snackbar>
        <Grid container className={styles.form}>
          <Grid item sm />
          <Grid item sm md={5}>
            <Paper elevation={window.innerWidth < 1024 ? 0 : 1} className={styles.paper}>
            <Typography variant="h2" className={styles.pageTitle}>
              Sign Up
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="username"
                name="username"
                type="username"
                label="Username"
                className={styles.TextField}
                fullWidth
                helperText={errors.username}
                error={errors.username ? true : false}
                value={this.state.username}
                onChange={this.handleChange}
              />
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                helperText={errors.email}
                error={errors.email ? true : false}
                className={styles.TextField}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                helperText={errors.password}
                error={errors.password ? true : false}
                className={styles.TextField}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                fullWidth
                className={styles.TextField}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              {errors.general && (
                <Typography variant="body2" className={styles.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                className={styles.button}
                disabled={loading}
              >
                Sign UP
                {loading && (
                  <CircularProgress className={styles.progress} size={30} />
                 )}
              </Button>
              <br />
              <small>
                Already have an account? <Link to="/login">Log In</Link>
              </small>
            </form>
            </Paper>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    )
  }
}

export default SignUp
