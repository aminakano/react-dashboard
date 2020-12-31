import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Grid } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import styles from "./Header.module.css";
import img from "../../images/icon.png";

const Header = () => {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar className={styles.toolbar}>
        <Grid container alignItems="center">
          <Grid item>
            <img src={img} alt="logo" className={styles.img} />
          </Grid>
          <Grid item>
            <Typography variant="h5" className={styles.title}>Dashboard</Typography>
          </Grid>
          <Grid item>
            <IconButton>
            <MenuIcon className={styles.menu}/>
            </IconButton>
          </Grid>
        </Grid>       
        <Button>Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
