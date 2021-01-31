import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { TextField, Button, CircularProgress, Grid, Typography, Paper } from "@material-ui/core";
import styles from "./LogIn.module.css";


export class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    // const userData = {
    //   email: this.state.email,
    //   password: this.state.password,
    // };
    // this.props.LogInUser(newUserData, this.props.history);
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
          <Grid item sm md={9}>
            <Paper elevation={window.innerWidth < 1024 ? 0 : 1} className={styles.paper}>
              <Typography variant="h2" className={styles.pageTitle}>
                Log In
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
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
                Log In
                {/* {loading && ( */}
                  <CircularProgress className={styles.progress} size={30} />
                {/* )} */}
              </Button>
              <br />
              <small>
                No account yet? <Link to="/create">Sign Up</Link>
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

export default LogIn
