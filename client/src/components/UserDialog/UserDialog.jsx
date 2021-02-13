import React from 'react';
import styles from "./UserDialog.module.css";

import { Typography, Grid, Dialog, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'


const UserDialog = ({ username, open, handleClose, logoutAction }) => {
  const openState = open;
  const myUser = username; 
  return (
    <Dialog
      open={openState}
      onClose={() => handleClose()}
      fullWidth
      maxWidth="xs">
      <DialogContent className={styles.dialog}>
        <Typography align="center">
          <FontAwesomeIcon
            icon={faUserCircle}
            size="5x"
            className={styles.avatar}
          />
        </Typography>
        <Typography variant="h5" align="center" className={styles.title}>{myUser}</Typography>
        <DialogContentText>text</DialogContentText>
        <Typography variant="h6" className={`${styles.bt} ${styles.menu}`}>Settings</Typography>
        <Typography 
          className={`${styles.red} ${styles.bt} ${styles.menu}`}
          variant="h6" 
          onClick={() => logoutAction()}>
          Log out
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default UserDialog
