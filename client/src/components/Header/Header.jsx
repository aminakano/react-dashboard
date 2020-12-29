import React from 'react';
import { AppBar, Toolbar, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import styles from "./Header.module.css";

const Header = () => {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <MenuIcon className={styles.menu}/>
        <Button>Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
