import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { TextField, Button, CircularProgress, Grid, Typography, Paper } from "@material-ui/core";
import styles from "./SignUp.module.css";

import axios from "axios";

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username,
    };
    console.log(newUserData);

    axios.post("/users/add", newUserData)
      .then(res => console.log(res.data));

      window.location = "/"
    // this.props.signupUser(newUserData, this.props.history);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
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
                // disabled={loading}
              >
                Sign UP
                {/* {loading && ( */}
                  <CircularProgress className={styles.progress} size={30} />
                {/* )} */}
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
