import React from 'react';
import styles from "./UserDialog.module.css";

import { Typography, Dialog, DialogContent, List, ListItem } from "@material-ui/core";
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
        <Typography align="center" gutterBottom>
          <FontAwesomeIcon
            icon={faUserCircle}
            size="5x"
            className={styles.avatar}
          />
        </Typography>
        <Typography variant="h5" align="center" gutterBottom className={styles.title}>{myUser}</Typography>
        <List>
          <ListItem button className={styles.bt}>
            <Typography variant="body1" className={`${styles.menu}`}>Settings</Typography>
          </ListItem>
          <ListItem button className={styles.bt}>
            <Typography 
              className={`${styles.red} ${styles.menu}`}
              variant="body1" 
              onClick={() => logoutAction()}>
              Log out
            </Typography>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default UserDialog
