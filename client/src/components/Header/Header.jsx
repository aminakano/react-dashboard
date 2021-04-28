import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { UserDialog } from "../../components";
import { AppBar, Toolbar, Button, Typography, Grid } from "@material-ui/core";
import styles from "./Header.module.css";
import img from "../../images/icon.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Header = ({ loginStatus, token, logoutAction }) => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = loginStatus;
  const userData = token;
  let location = useLocation()
  const path = location.pathname;

  const loginBtn = <Link to="/login">Login</Link>;
  const signupBtn = <Link to="/signup">Sign Up</Link>;
  const logoutBtn = <Link to="/">Logout</Link>;

  let btn;
  if(path === "/login") {
    btn = signupBtn;
  } else if(path === "/signup") {
    btn = loginBtn
  }

  const handleClick = e => {
    window.location.pathname = "/"
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar className={styles.toolbar}>
        <Grid container alignItems="center" onClick={handleClick} className={styles.logo}>
          <Grid item>
            <img src={img} alt="logo" className={styles.img} />
          </Grid>
          <Grid item >
            <Typography variant="h5" className={styles.title} noWrap>Dashboard</Typography>
          </Grid>
        </Grid>
        <Grid container></Grid>
        <Grid container></Grid>
        <Grid container></Grid>
        <Grid container></Grid>
        <Grid container justify="flex-end" alignItems="center">
          {isLoggedIn ? 
            (<Grid item>
              <Button 
                className={styles.button2}
                onClick={handleOpen}
                >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="3x"
                  className={styles.avatar}
                />
                {userData.username}
              </Button>
              <UserDialog
                token={userData}
                open={open}
                logoutAction={() => logoutAction()}
                handleClose={() => handleClose()}
                 />
              <Button 
                className={styles.button} 
                onClick={() => logoutAction()}>
                {logoutBtn}
              </Button>
            </Grid>) 
              : 
            <Button className={styles.button}>{btn}</Button>
          }
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
